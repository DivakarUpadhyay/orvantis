"use client";

import { useEffect, useState } from "react";

// Cycles through words with a short slide-up, like a Windows live tile.
// The first word is rendered on the server so the headline is never empty.
export function RotatingWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* Widest word reserves the space so the line doesn't jump. */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <span key={i} className="col-start-1 row-start-1 animate-fade-in text-brand" aria-live="polite">
        {words[i]}
      </span>
    </span>
  );
}
