"use client";

import { Info, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { INQUIRY_TOPIC_LABEL, INQUIRY_TOPICS, type InquiryInput, type InquiryTopic } from "../../lib/shared/contract";

const PREVIEW_NOTICE =
  "This inquiry form is a preview and is not connected yet. Your message was not sent.";

const fields = [
  { id: "name", label: "Name", placeholder: "Your name", autoComplete: "name", type: "text" },
  { id: "email", label: "Email", placeholder: "you@example.com", autoComplete: "email", type: "email" },
] as const;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim() || null;
    const topic = String(form.get("topic") ?? "") as InquiryTopic;
    const message = String(form.get("message") ?? "").trim();
    if (!name || !email.includes("@") || !message || !INQUIRY_TOPICS.includes(topic)) {
      setError("Complete the required fields with a valid email.");
      return;
    }
    const inquiry: InquiryInput = { name, email, phone, topic, message };
    void inquiry;
    setError("");
    setSubmitted(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {fields.map(({ id, label, ...input }) => (
        <div key={id}>
          <label htmlFor={`contact-${id}`}>{label}</label>
          <input id={`contact-${id}`} name={id} required {...input} />
        </div>
      ))}

      <label htmlFor="contact-phone">Phone (optional)</label>
      <input id="contact-phone" name="phone" autoComplete="tel" type="tel" />

      <label htmlFor="contact-topic">Topic</label>
      <select id="contact-topic" name="topic" required>
        {INQUIRY_TOPICS.map((topic) => (
          <option key={topic} value={topic}>{INQUIRY_TOPIC_LABEL[topic]}</option>
        ))}
      </select>

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
      {error && <p aria-live="polite" role="alert">{error}</p>}
    </form>
  );
}
