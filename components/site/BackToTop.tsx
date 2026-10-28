"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [nudging, setNudging] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const nudgeTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = String(
          100 - Math.min(1, Math.max(0, nextProgress)) * 100,
        );
      }
      const nextVisible = window.scrollY > 600;
      setVisible((current) => (current === nextVisible ? current : nextVisible));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(nudgeTimeout.current);
  }, []);

  const handleClick = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reducedMotion) {
      setNudging(true);
      window.clearTimeout(nudgeTimeout.current);
      nudgeTimeout.current = window.setTimeout(() => setNudging(false), 180);
    }

    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className="back-to-top"
      data-visible={visible}
      data-nudging={nudging}
      aria-hidden={!visible}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={handleClick}
    >
      <svg className="back-to-top-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="back-to-top-track" cx="24" cy="24" r="22.5" pathLength="100" />
        <circle
          ref={progressRef}
          className="back-to-top-progress"
          cx="24"
          cy="24"
          r="22.5"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100}
        />
      </svg>
      <ArrowUp aria-hidden="true" strokeWidth={1.75} className="back-to-top-icon" />
      <span className="back-to-top-tooltip" aria-hidden="true">
        Back to top
      </span>
    </button>
  );
}
