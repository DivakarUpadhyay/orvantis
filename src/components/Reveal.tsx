"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Fades in every [data-reveal] element as it scrolls into view. Elements that
// enter together are staggered so grids cascade in, Windows-style. Re-scans on
// each navigation so client-side page changes are covered too.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        let i = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.style.setProperty("--reveal-delay", `${Math.min(i, 6) * 70}ms`);
          el.classList.add("is-visible");
          io.unobserve(el);
          i++;
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
