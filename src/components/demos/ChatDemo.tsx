"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, CheckCheck, Send } from "lucide-react";

type Msg = { from: "bot" | "user" | "agent"; text: string; replies?: string[] };

const menu = ["Track my order", "Book a demo", "Pricing", "Talk to a person"];

function respond(input: string): Msg[] {
  const t = input.toLowerCase();
  if (t.includes("track")) return [{ from: "bot", text: "Sure! Please share your order number.", replies: ["ORV-10482"] }];
  if (t.startsWith("orv-"))
    return [{ from: "bot", text: `📦 Order ${input.toUpperCase()} is out for delivery and will arrive today by 6 PM. Courier: Delhivery.`, replies: menu }];
  if (t.includes("demo")) return [{ from: "bot", text: "Pick a time that suits you (IST):", replies: ["Tomorrow 11:00", "Tomorrow 15:30", "Friday 10:00"] }];
  if (/^(tomorrow|friday)/.test(t))
    return [{ from: "bot", text: `✅ Booked for ${input}. A calendar invite is on its way to your email.`, replies: menu }];
  if (t.includes("pric"))
    return [{ from: "bot", text: "Projects start from a fixed-price discovery phase. Shall our team send you a tailored estimate?", replies: ["Talk to a person", "Book a demo"] }];
  if (t.includes("person") || t.includes("human") || t.includes("agent"))
    return [
      { from: "bot", text: "Connecting you to our team… I've shared this conversation so you won't need to repeat yourself." },
      { from: "agent", text: "Hi, this is Priya from Orvantis 👋 How can I help?", replies: menu },
    ];
  return [{ from: "bot", text: "I can help with orders, demos and pricing. Choose an option below:", replies: menu }];
}

export function ChatDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Hi! I'm the Orvantis assistant. What can I do for you today?", replies: menu },
  ]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function send(value: string) {
    const v = value.trim();
    if (!v || typing) return;
    setMsgs((m) => [...m.map((x) => ({ ...x, replies: undefined })), { from: "user", text: v }]);
    setText("");
    setTyping(true);
    const replies = respond(v);
    replies.forEach((r, i) => {
      setTimeout(() => {
        setMsgs((m) => [...m, r]);
        if (i === replies.length - 1) setTyping(false);
      }, 800 + i * 1100);
    });
  }

  const last = msgs[msgs.length - 1];

  return (
    <div className="flex h-[30rem] flex-col" data-testid="demo-chat">
      <div className="flex items-center gap-3 border-b border-line bg-card px-4 py-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-on-brand"><Bot className="h-5 w-5" /></span>
        <div>
          <p className="text-sm font-semibold text-ink">Orvantis Assistant</p>
          <p className="text-[11px] text-ok">online · replies instantly</p>
        </div>
      </div>
      <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto bg-surface-3/40 p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex animate-fade-in ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm ${
                m.from === "user" ? "rounded-br-sm bg-brand text-on-brand" : "rounded-bl-sm border border-line bg-card-solid text-ink"
              }`}
            >
              {m.from === "agent" && <p className="mb-0.5 text-[11px] font-semibold text-brand">Priya · Orvantis team</p>}
              {m.text}
              {m.from === "user" && <CheckCheck className="ml-1 inline h-3.5 w-3.5 opacity-70" />}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-1 px-2 py-1" aria-label="Assistant is typing">
            {[0, 1, 2].map((d) => (
              <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 120}ms` }} />
            ))}
          </div>
        )}
        {!typing && last.replies && (
          <div className="flex flex-wrap gap-1.5 pt-1" data-testid="chat-replies">
            {last.replies.map((r) => (
              <button key={r} type="button" onClick={() => send(r)} className="rounded-md border border-brand/40 bg-card-solid px-2.5 py-1 text-xs font-medium text-brand transition hover:bg-brand hover:text-on-brand">
                {r}
              </button>
            ))}
          </div>
        )}
      </div>
      <form
        className="flex gap-2 border-t border-line bg-card p-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          send(text);
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message…" className="field mt-0 flex-1" aria-label="Message" />
        <button type="submit" className="btn-primary px-3" aria-label="Send"><Send className="h-4 w-4" /></button>
      </form>
    </div>
  );
}
