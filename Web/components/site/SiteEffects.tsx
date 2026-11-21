"use client";

import { useEffect } from "react";

/**
 * Page-wide progressive enhancements, mounted once:
 *  - scroll reveal for every `[data-reveal]` element
 *  - cursor-follow spotlight for every `[data-spotlight]` card
 * Renders nothing. Without JS (or with reduced motion) all content stays visible.
 */
export default function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let observer: IntersectionObserver | undefined;
    if (!reduceMotion && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      observer = io;
      document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
      root.dataset.revealReady = "";
    }

    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const card = (event.target as Element).closest<HTMLElement>("[data-spotlight]");
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointerMove);
      delete root.dataset.revealReady;
    };
  }, []);

  return null;
}
