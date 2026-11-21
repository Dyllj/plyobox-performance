import { ArrowRight } from "lucide-react";
import Photo from "../site/Photo";

export default function JoinBannerSection() {
  return (
    <section aria-labelledby="join-title" className="section-wrap">
      <div className="join-banner" data-reveal="scale">
        <div className="join-copy">
          <h2 id="join-title">Your first session starts here.</h2>
          <p>Create an account, choose your pass, and get ready to train.</p>
          <a className="button button-dark" href="#membership">
            Join the gym <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <Photo
          alt="Members training together at Plyobox Performance Gym"
          className="photo-lime join-photo"
          label="Photo · members training together"
          src="/WorkingOut.jpg"
        />
      </div>
    </section>
  );
}
