import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { frequentlyAskedQuestions, siteInfo } from "../../data/site";
import { stagger } from "../../lib/stagger";
import ContactForm from "../forms/ContactForm";
import SectionHeading from "../site/SectionHeading";

const lat = siteInfo.lat;
const lng = siteInfo.lng;
const span = 0.02;
const mapSrc =
  lat !== null && lng !== null
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${lng - span},${lat - span},${lng + span},${lat + span}` +
      `&layer=mapnik&marker=${lat},${lng}`
    : null;

const contactDetails = [
  { id: "address", Icon: MapPin, text: siteInfo.address ?? [siteInfo.locality, siteInfo.region].filter(Boolean).join(", ") },
  { id: "phone", Icon: Phone, text: siteInfo.phone },
  { id: "email", Icon: Mail, text: siteInfo.email },
  { id: "hours", Icon: Clock, text: siteInfo.hours },
] as const;

export default function ContactSection() {
  return (
    <section
      aria-label="Frequently asked questions and contact"
      className="section section-alt section-contact"
    >
      <div className="section-wrap contact-grid">
        <div className="faq-column" id="faq">
          <SectionHeading eyebrow="FAQ" title="Good to know." />
          <div className="faq-list" data-reveal style={stagger(2)}>
            {frequentlyAskedQuestions.map((item) => (
              <details className="faq-item" key={item.question} name="faq">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="contact-column" id="contact">
          <SectionHeading eyebrow="Contact" title="Come train with us." />
          <address className="contact-meta" data-reveal style={stagger(2)}>
            <ul>
              {contactDetails.filter(({ text }) => text !== null).map(({ id, Icon, text }) => (
                <li key={id}>
                  <Icon aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </address>
          <div data-reveal style={stagger(3)}>
            <ContactForm />
            {mapSrc && (
              <div className="map-frame">
                <iframe
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  src={mapSrc}
                  title={`Map of ${[siteInfo.locality, siteInfo.region].filter(Boolean).join(", ")}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
