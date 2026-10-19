"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

// Lets a reseller turn a product page into a personal referral link.
// The order form reads ?ref= and attaches it to the order email.
export function ShareEarn({ slug, name, commission }: { slug: string; name: string; commission?: string }) {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const clean = code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  const link = typeof window === "undefined" ? "" : `${window.location.origin}/products/${slug}${clean ? `?ref=${clean}` : ""}#order`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the link stays visible to copy manually.
    }
  }

  return (
    <div className="card p-4" data-testid="share-earn">
      <p className="flex items-center gap-2 font-semibold text-ink">
        <Share2 className="h-4 w-4 text-brand" /> Share &amp; earn
        {commission && <span className="rounded-sm bg-ok/15 px-1.5 py-0.5 text-[11px] font-semibold text-ok">{commission} commission</span>}
      </p>
      <p className="mt-1 text-sm text-muted">
        Resellers earn commission on completed orders placed through their link.{" "}
        <a href="/marketplace#resell" className="text-brand hover:underline">Become a reseller</a>
      </p>
      <div className="mt-3 flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Your reseller code"
          aria-label="Your reseller code"
          className="field mt-0 flex-1 uppercase"
          data-testid="share-code"
        />
        <button type="button" onClick={copy} disabled={!clean} className="btn-ghost px-3" data-testid="share-copy">
          {copied ? <Check className="h-4 w-4 text-ok" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      {clean && (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <code className="break-all rounded-sm bg-surface-3 px-2 py-1 text-ink" data-testid="share-link">{link}</code>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${name} — ${link}`)}`}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-ok hover:underline"
          >
            Share on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
