"use client";

import { useId, useState, type FormEvent } from "react";
import {
  CONTACT_LIMITS,
  type ContactErrors,
  type ContactPayload,
  type ContactStatus,
} from "@/lib/contact";
import { buttonClass, ArrowIcon } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import styles from "./contact-form.module.css";

const empty: ContactPayload = { name: "", email: "", subject: "", message: "" };

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<ContactStatus>({ state: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as {
        ok: boolean;
        error?: string;
        errors?: ContactErrors;
        fallbackEmail?: string;
        notConfigured?: boolean;
      };

      if (result.ok) {
        setValues(empty);
        setErrors({});
        setStatus({
          state: "success",
          message: "Message sent. Thank you. I will reply to the address you provided.",
        });
        return;
      }

      setErrors(result.errors ?? {});
      setStatus({
        state: "error",
        message: result.error ?? "The message could not be sent.",
        fallbackEmail: result.fallbackEmail,
      });
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className={styles.form}>
      {/* Honeypot: hidden from users and assistive tech, filled by bots. */}
      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor={`${formId}-company`}>Company website</label>
        <input
          id={`${formId}-company`}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.row}>
        {fields.map((field) => (
          <Field
            key={field.name}
            id={`${formId}-${field.name}`}
            name={field.name}
            label={field.label}
            type={field.type}
            autoComplete={field.autoComplete}
            value={values[field.name]}
            error={errors[field.name]}
            maxLength={CONTACT_LIMITS[field.name]}
            onChange={(value) => {
              setValues((current) => ({ ...current, [field.name]: value }));
              if (errors[field.name]) {
                setErrors((current) => ({ ...current, [field.name]: undefined }));
              }
            }}
          />
        ))}
      </div>

      <Field
        id={`${formId}-message`}
        name="message"
        label="Message"
        type="textarea"
        value={values.message}
        error={errors.message}
        maxLength={CONTACT_LIMITS.message}
        hint="What problem are you working on, and what would a good outcome look like?"
        onChange={(value) => {
          setValues((current) => ({ ...current, message: value }));
          if (errors.message) {
            setErrors((current) => ({ ...current, message: undefined }));
          }
        }}
      />

      <div className={styles.footer}>
        <button
          type="submit"
          disabled={status.state === "submitting"}
          className={buttonClass({ size: "lg" })}
        >
          {status.state === "submitting" ? "Sending" : "Send Message"}
          {status.state !== "submitting" ? <ArrowIcon /> : null}
        </button>

        <p className={styles.delivery}>
          Delivered to {status.fallbackEmail ?? "ceo@nepsof.com"}
        </p>
      </div>

      <div aria-live="polite" role="status">
        {status.state === "success" ? (
          <p className={`${styles.message} ${styles.success}`}>
            {status.message}
          </p>
        ) : null}
        {status.state === "error" ? (
          <p className={`${styles.message} ${styles.error}`}>
            {status.message}
            {status.fallbackEmail ? (
              <>
                {" "}
                <a
                  href={`mailto:${status.fallbackEmail}`}
                  className={`link-underline ${styles.errorLink}`}
                >
                  {status.fallbackEmail}
                </a>
              </>
            ) : null}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type,
  value,
  error,
  hint,
  maxLength,
  autoComplete,
  onChange,
}: {
  id: string;
  name: keyof ContactPayload;
  label: string;
  type: "text" | "email" | "textarea";
  value: string;
  error?: string;
  hint?: string;
  maxLength: number;
  autoComplete?: string;
  onChange: (value: string) => void;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  const controlClass = cn(
    styles.control,
    type === "textarea" ? styles.textarea : styles.input,
    error && styles.controlError,
  );

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={6}
          value={value}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={controlClass}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          maxLength={maxLength}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={controlClass}
        />
      )}

      <div className={styles.hintRow}>
        {error ? (
          <p id={errorId} className={styles.hintError}>
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        ) : (
          <span />
        )}
        {type === "textarea" ? (
          <span className={styles.counter}>
            {value.length}/{maxLength}
          </span>
        ) : null}
      </div>
    </div>
  );
}
