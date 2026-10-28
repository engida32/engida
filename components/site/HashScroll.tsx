"use client";

import { useEffect } from "react";

const DURATION = 380;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function sameDocument(url: URL) {
  return (
    url.origin === window.location.origin &&
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  );
}

export function HashScroll() {
  useEffect(() => {
    let frame: number | null = null;

    const cancel = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    };

    const scrollToHash = (hash: string) => {
      let id: string;
      try {
        id = decodeURIComponent(hash.slice(1));
      } catch {
        return;
      }

      const target = document.getElementById(id);
      if (!target) return;

      const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const start = window.scrollY;
      const end = Math.max(0, start + target.getBoundingClientRect().top - margin);
      const distance = end - start;

      cancel();
      if (window.location.hash !== hash) {
        window.history.pushState(window.history.state, "", hash);
      }

      const focusTarget = () => {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(distance) < 2) {
        window.scrollTo(0, end);
        focusTarget();
        return;
      }

      const started = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - started) / DURATION);
        window.scrollTo(0, start + distance * easeOutCubic(progress));
        if (progress < 1) {
          frame = requestAnimationFrame(step);
        } else {
          frame = null;
          focusTarget();
        }
      };

      frame = requestAnimationFrame(step);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;

      const url = new URL(anchor.href, window.location.href);
      if (!sameDocument(url) || !url.hash || url.hash === "#" || url.hash === "#main") return;

      let id: string;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      scrollToHash(url.hash);
    };

    const onUserScroll = () => cancel();

    document.addEventListener("click", onClick);
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchstart", onUserScroll, { passive: true });
    window.addEventListener("keydown", onUserScroll);

    return () => {
      cancel();
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
      window.removeEventListener("keydown", onUserScroll);
    };
  }, []);

  return null;
}
