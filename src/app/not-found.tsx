import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center py-28 text-center" data-testid="not-found">
      <p className="font-mono text-sm font-semibold text-brand">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-muted">The page you are looking for has moved or never existed.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Back to home</Link>
        <Link href="/services" className="btn-ghost">
          Browse services <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
