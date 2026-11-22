import { ArrowRight } from "lucide-react";
import { membershipPlans } from "../../data/site";
import { stagger } from "../../lib/stagger";
import { formatPeso } from "../../lib/shared/contract";
import SectionHeading from "../site/SectionHeading";

export default function MembershipSection() {
  return (
    <section
      aria-labelledby="membership-title"
      className="section section-wrap"
      id="membership"
    >
      <SectionHeading
        eyebrow="Membership"
        title="Two simple ways to train."
        titleId="membership-title"
      />
      <div className="membership-grid">
        {membershipPlans.map((plan, i) => (
          <div className="plan" data-reveal key={plan.id} style={stagger(i)}>
            <article
              className={`card membership-card${plan.featured ? " membership-card-featured" : ""}`}
              data-spotlight
            >
              <div className="membership-title-row">
                <h3>{plan.name}</h3>
                {plan.tag && <span className="popular-tag">{plan.tag}</span>}
              </div>
              <p>{plan.description}</p>
              <p className="price">{plan.priceMinor === null ? "Price set by the gym" : formatPeso(plan.priceMinor)}</p>
              <p className="price-unit">{plan.unit}</p>
              <a
                className={`button button-full ${plan.featured ? "button-lime" : "button-outline"}`}
                href={plan.href}
              >
                {plan.cta} <ArrowRight aria-hidden="true" />
              </a>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
