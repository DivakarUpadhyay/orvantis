"use client";

import { Moon, Sun } from "lucide-react";

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

// The initial theme is applied by an inline script in the root layout before
// hydration. Switching expands the new theme in a circle from the button
// (View Transitions API), falling back to an instant swap.
export function ThemeToggle() {
  function apply() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked; the theme still applies for this page view.
    }
  }

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const doc = document as ViewTransitionDoc;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) {
      apply();
      return;
    }
    const x = e.clientX || window.innerWidth - 40;
    const y = e.clientY || 32;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = doc.startViewTransition(apply);
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.1, 0.9, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      data-testid="theme-toggle"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition hover:bg-surface-3 hover:text-ink active:scale-95"
    >
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden="true" />
      <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden="true" />
    </button>
  );
}
