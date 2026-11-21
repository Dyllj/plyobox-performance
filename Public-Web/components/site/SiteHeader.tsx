"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { publicNavigation } from "../../data/site";

const SECTION_IDS = ["home", ...publicNavigation.map((item) => item.href.slice(1))];

/** Returns the id of the section currently crossing the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape or an outside tap.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const linkProps = (href: string) => ({
    href,
    "aria-current": active === href.slice(1) ? ("location" as const) : undefined,
  });

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="header-inner">
        <a aria-label="Plyobox Performance Gym home" className="brand" href="#home">
          <Image
            alt=""
            className="brand-logo"
            height={667}
            priority
            src="/Logo.png"
            width={2000}
          />
        </a>

        <nav aria-label="Primary navigation" className="primary-nav">
          {publicNavigation.map((item) => (
            <a className="nav-link" key={item.href} {...linkProps(item.href)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            aria-label="Member log in is not available yet"
            className="button button-outline login-button"
            disabled
            title="Member log in is coming soon"
            type="button"
          >
            Log in
          </button>
          <a className="button button-lime header-join" href="#membership">
            Join the gym
          </a>
        </div>

        <div className="mobile-menu" ref={menuRef}>
          <button
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            ref={toggleRef}
            type="button"
          >
            <span aria-hidden="true" className="menu-icon">
              <span />
              <span />
            </span>
            <span className="menu-label">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
          <nav
            aria-label="Mobile navigation"
            className="mobile-nav-panel"
            data-open={menuOpen}
            id="mobile-nav"
          >
            {publicNavigation.map((item) => (
              <a key={item.href} onClick={() => setMenuOpen(false)} {...linkProps(item.href)}>
                {item.label}
              </a>
            ))}
            <button className="mobile-login" disabled type="button">
              Log in <span>Coming soon</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
