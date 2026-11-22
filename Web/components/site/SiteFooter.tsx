import { ArrowUp } from "lucide-react";
import { cacheLife } from "next/cache";
import { siteInfo } from "../../data/site";
import BrandMark from "./BrandMark";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");

  return new Date().getFullYear();
}

const legalNotices = [
  { id: "privacy", title: "Privacy notice", body: "[PRIVACY NOTICE TEXT: to be supplied by the gym]" },
  { id: "terms", title: "Terms", body: "[TERMS OF USE: to be supplied by the gym]" },
] as const;

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-inner">
        <a aria-label="Plyobox Performance Gym home" className="footer-brand" href="#home">
          <BrandMark />
          <span>PLYOBOX</span>
        </a>
        <p className="copyright">
          © <CopyrightYear /> {siteInfo.name} · {[siteInfo.locality, siteInfo.region].filter(Boolean).join(", ")}
        </p>
        <div className="footer-end">
          <div className="legal-links">
            {legalNotices.map(({ id, title, body }) => (
              <details id={id} key={id}>
                <summary>{title}</summary>
                <p>{body}</p>
              </details>
            ))}
          </div>
          <a aria-label="Back to top" className="back-to-top" href="#home">
            <ArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
