"use client";

import { Info, Send } from "lucide-react";
import { Fragment, useState, type FormEvent } from "react";

const PREVIEW_NOTICE =
  "This inquiry form is a preview and is not connected yet. Your message was not sent.";

const fields = [
  { id: "name", label: "Name", placeholder: "Your name", autoComplete: "name", type: "text" },
  { id: "email", label: "Email", placeholder: "you@example.com", autoComplete: "email", type: "email" },
] as const;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {fields.map(({ id, label, ...input }) => (
        <Fragment key={id}>
          <label htmlFor={`contact-${id}`}>{label}</label>
          <input id={`contact-${id}`} name={id} required {...input} />
        </Fragment>
      ))}

      <label htmlFor="contact-message">Message</label>
      <textarea
        id="contact-message"
        name="message"
        placeholder="How can we help?"
        required
        rows={4}
      />

      <button className="button button-lime" type="submit">
        Send inquiry <Send aria-hidden="true" />
      </button>

      <p aria-live="polite" className="form-notice" data-visible={submitted} role="status">
        {submitted && (
          <>
            <Info aria-hidden="true" />
            {PREVIEW_NOTICE}
          </>
        )}
      </p>
    </form>
  );
}
