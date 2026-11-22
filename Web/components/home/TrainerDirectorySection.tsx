import { ArrowRight, UserPlus } from "lucide-react";
import { trainers } from "../../data/site";
import { stagger } from "../../lib/stagger";
import Photo from "../site/Photo";

export default function TrainerDirectorySection() {
  return (
    <section aria-labelledby="trainers-title" className="section section-alt" id="trainers">
      <div className="section-wrap">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow" data-reveal>
              Trainer directory
            </p>
            <h2 data-reveal id="trainers-title" style={stagger(1)}>
              Find a coach. Book a session.
            </h2>
          </div>
          <a
            className="button button-outline"
            data-reveal
            href="#trainer-directory"
            style={stagger(2)}
          >
            Browse all trainers
          </a>
        </div>

        <div className="trainer-grid" id="trainer-directory">
          {trainers.map((trainer, i) => (
            <article
              className="card trainer-card"
              data-reveal
              data-spotlight
              key={trainer.id}
              style={stagger(i)}
            >
              <Photo
                alt="Coach demonstrating a kettlebell lunge at Plyobox Performance Gym"
                className="trainer-photo"
                label="Trainer photo"
                src="/Coach.jpg"
              />
              <div className="trainer-card-body">
                {trainer.name && <h3>{trainer.name}</h3>}
                {(trainer.specialty || trainer.yearsExperience !== null) && (
                  <p className="trainer-specialty">
                    {trainer.specialty}
                    {trainer.specialty && trainer.yearsExperience !== null && <span> · </span>}
                    {trainer.yearsExperience !== null && `${trainer.yearsExperience} yrs`}
                  </p>
                )}
                <div className="trainer-card-footer">
                  <span className="trainer-rate">
                    {trainer.services.length
                      ? `From ₱${Math.min(...trainer.services.map((service) => service.priceMinor)) / 100}`
                      : "Rate set by trainer"}
                  </span>
                  <details className="trainer-details">
                    <summary>
                      View profile <ArrowRight aria-hidden="true" />
                    </summary>
                    <p>
                      {trainer.bio ?? "Contact this trainer to ask about services and availability."}
                    </p>
                  </details>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="card trainer-invite" data-reveal data-spotlight>
          <div>
            <h3>Are you a trainer?</h3>
            <p>Create an account, complete your profile, and get discovered.</p>
          </div>
          <a className="button button-lime" href="#contact">
            <UserPlus aria-hidden="true" /> Register as a trainer
          </a>
        </aside>
      </div>
    </section>
  );
}
