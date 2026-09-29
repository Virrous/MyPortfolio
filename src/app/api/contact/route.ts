import { Resend } from "resend";
import { validateContact } from "@/lib/contact";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const recipient = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
const sender = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

/** Cheap bot trap: a real browser never fills a hidden field. */
const honeypotField = "company_website";

function json(payload: unknown, status = 200) {
  return Response.json(payload, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  let body: unknown;

  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: "Invalid request body." }, 400);
    }
  } else {
    const form = await request.formData();
    body = Object.fromEntries(form.entries());
  }

  const input = body as Record<string, unknown>;

  // Silently accept honeypot hits so bots do not learn they were filtered.
  if (typeof input[honeypotField] === "string" && input[honeypotField].length > 0) {
    return json({ ok: true });
  }

  const { data, errors } = validateContact(body);

  if (Object.keys(errors).length > 0) {
    return json(
      { ok: false, error: "Please correct the highlighted fields.", errors },
      400,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(
      {
        ok: false,
        error:
          "The contact form is not connected to an email service yet. Please email directly.",
        notConfigured: true,
        fallbackEmail: recipient,
      },
      503,
    );
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Subject: ${data.subject}`,
        "",
        data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error.message);
      return json(
        {
          ok: false,
          error: "The message could not be sent. Please email directly.",
          fallbackEmail: recipient,
        },
        502,
      );
    }

    return json({ ok: true });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return json(
      {
        ok: false,
        error: "Something went wrong on our side. Please email directly.",
        fallbackEmail: recipient,
      },
      500,
    );
  }
}
