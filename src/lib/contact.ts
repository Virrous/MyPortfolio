export const contactFieldNames = ["name", "email", "subject", "message"] as const;

export type ContactFieldName = (typeof contactFieldNames)[number];
export type ContactPayload = Record<ContactFieldName, string>;
export type ContactErrors = Partial<Record<ContactFieldName, string>>;

export const CONTACT_LIMITS: Record<ContactFieldName, number> = {
  name: 100,
  email: 200,
  subject: 150,
  message: 4000,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitise(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/\0/g, "").trim();
}

export function validateContact(
  body: unknown,
): { data: ContactPayload; errors: ContactErrors } {
  const input = (body ?? {}) as Record<string, unknown>;

  const data: ContactPayload = {
    name: sanitise(input.name),
    email: sanitise(input.email),
    subject: sanitise(input.subject),
    message: sanitise(input.message),
  };

  const errors: ContactErrors = {};

  if (data.name.length < 2) {
    errors.name = "Please enter your name.";
  } else if (data.name.length > CONTACT_LIMITS.name) {
    errors.name = `Name must be under ${CONTACT_LIMITS.name} characters.`;
  }

  if (!data.email) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(data.email) || data.email.length > CONTACT_LIMITS.email) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.subject.length < 3) {
    errors.subject = "Please add a short subject.";
  } else if (data.subject.length > CONTACT_LIMITS.subject) {
    errors.subject = `Subject must be under ${CONTACT_LIMITS.subject} characters.`;
  }

  if (data.message.length < 10) {
    errors.message = "Please describe the problem in a little more detail.";
  } else if (data.message.length > CONTACT_LIMITS.message) {
    errors.message = `Message must be under ${CONTACT_LIMITS.message} characters.`;
  }

  return { data, errors };
}

export type ContactStatus = {
  state: "idle" | "submitting" | "success" | "error";
  message?: string;
  /** True when email delivery is not configured and a mailto link is offered. */
  fallbackEmail?: string;
};
