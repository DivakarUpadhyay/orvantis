"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, Check, IdCard, Loader2, ScanFace, Smartphone } from "lucide-react";

const DEMO_OTP = "482916";
const steps = [
  { label: "Mobile", icon: Smartphone },
  { label: "ID document", icon: IdCard },
  { label: "Liveness", icon: ScanFace },
  { label: "Decision", icon: BadgeCheck },
];

export function KycDemo() {
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [extracted, setExtracted] = useState(false);
  const [face, setFace] = useState(0);

  // Liveness scan progress
  useEffect(() => {
    if (step !== 2) return;
    const id = setInterval(() => {
      setFace((f) => {
        if (f >= 100) {
          clearInterval(id);
          setTimeout(() => setStep(3), 400);
          return 100;
        }
        return f + 4;
      });
    }, 70);
    return () => clearInterval(id);
  }, [step]);

  function verifyOtp() {
    if (otp === DEMO_OTP) {
      setOtpError("");
      setStep(1);
    } else setOtpError(`Incorrect OTP. For this demo use ${DEMO_OTP}.`);
  }

  function captureId() {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setExtracted(true);
    }, 1500);
  }

  function restart() {
    setStep(0);
    setOtpSent(false);
    setOtp("");
    setExtracted(false);
    setFace(0);
  }

  return (
    <div className="p-4 sm:p-5" data-testid="demo-kyc">
      {/* Stepper */}
      <ol className="flex items-center gap-2">
        {steps.map((s, i) => (
          <li key={s.label} className="flex flex-1 items-center gap-2">
            <span
              className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition ${
                i < step ? "bg-ok text-white" : i === step ? "bg-brand text-on-brand" : "bg-surface-3 text-muted"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : <s.icon className="h-3.5 w-3.5" />}
            </span>
            <span className={`hidden text-xs sm:inline ${i === step ? "font-semibold text-ink" : "text-muted"}`}>{s.label}</span>
            {i < steps.length - 1 && <span className={`h-px flex-1 ${i < step ? "bg-ok" : "bg-line"}`} />}
          </li>
        ))}
      </ol>

      <div className="mt-5 min-h-64 rounded-md border border-line bg-card p-5">
        {step === 0 && (
          <div className="mx-auto max-w-sm animate-fade-in">
            <p className="font-semibold text-ink">Verify your mobile number</p>
            <label className="mt-3 block text-sm text-ink">
              Mobile number
              <input className="field" defaultValue="+91 98200 12345" />
            </label>
            {!otpSent ? (
              <button type="button" className="btn-primary mt-4 w-full justify-center" onClick={() => setOtpSent(true)} data-testid="kyc-send-otp">
                Send OTP
              </button>
            ) : (
              <div className="mt-4 animate-fade-in">
                <label className="block text-sm text-ink">
                  Enter OTP <span className="text-muted">(demo OTP: {DEMO_OTP})</span>
                  <input
                    className="field font-mono tracking-[0.5em]"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    aria-invalid={otpError ? true : undefined}
                    data-testid="kyc-otp"
                  />
                </label>
                {otpError && <p className="mt-1.5 text-xs text-danger">{otpError}</p>}
                <button type="button" className="btn-primary mt-4 w-full justify-center" onClick={verifyOtp} data-testid="kyc-verify-otp">
                  Verify
                </button>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="grid animate-fade-in gap-5 sm:grid-cols-2">
            <div className="relative aspect-[1.58] overflow-hidden rounded-lg bg-gradient-to-br from-[#0b5cad] to-[#3a8dde] p-4 text-white shadow-md">
              <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Government ID · Sample</p>
              <div className="mt-3 flex gap-3">
                <div className="h-16 w-14 rounded bg-white/25" />
                <div className="space-y-1.5 text-[11px]">
                  <p>ASHA VERMA</p>
                  <p>DOB 14/02/1994</p>
                  <p className="font-mono">XXXX XXXX 4821</p>
                </div>
              </div>
              {scanning && (
                <div className="absolute inset-x-0 top-0 h-1/3 animate-[scan_1.5s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-white/50 to-transparent" />
              )}
            </div>
            <div>
              {!extracted ? (
                <button type="button" className="btn-primary" onClick={captureId} disabled={scanning} data-testid="kyc-capture">
                  {scanning ? <><Loader2 className="h-4 w-4 animate-spin" /> Reading document…</> : "Capture ID"}
                </button>
              ) : (
                <div className="animate-fade-in">
                  <p className="text-sm font-semibold text-ink">Extracted with OCR</p>
                  <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                    <dt className="text-muted">Name</dt><dd className="text-ink">Asha Verma</dd>
                    <dt className="text-muted">Date of birth</dt><dd className="text-ink">14 Feb 1994</dd>
                    <dt className="text-muted">ID number</dt><dd className="font-mono text-ink">XXXX XXXX 4821</dd>
                    <dt className="text-muted">Confidence</dt><dd className="text-ok">98.6%</dd>
                  </dl>
                  <button type="button" className="btn-primary mt-4" onClick={() => setStep(2)} data-testid="kyc-continue">Continue</button>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex animate-fade-in flex-col items-center">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                <circle cx="50" cy="50" r="46" fill="none" stroke="var(--line)" strokeWidth="4" />
                <circle
                  cx="50" cy="50" r="46" fill="none" stroke="var(--brand)" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${(face / 100) * 289} 289`}
                />
              </svg>
              <div className="absolute inset-4 flex items-center justify-center rounded-full bg-surface-3">
                <ScanFace className="h-16 w-16 text-brand" strokeWidth={1.2} />
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold text-ink">Checking liveness… {face}%</p>
            <p className="text-xs text-muted">Look at the camera and blink. (Simulated, no camera used.)</p>
          </div>
        )}

        {step === 3 && (
          <div className="flex animate-fade-in flex-col items-center text-center" data-testid="kyc-approved">
            <BadgeCheck className="h-14 w-14 text-ok" />
            <p className="mt-2 text-lg font-semibold text-ink">KYC approved</p>
            <div className="mt-4 grid w-full max-w-md grid-cols-3 gap-2 text-sm">
              {[
                ["Face match", "97.4%"],
                ["Liveness", "99.1%"],
                ["Risk", "Low"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-md border border-line bg-card-solid p-2">
                  <p className="text-xs text-muted">{k}</p>
                  <p className="font-semibold text-ink">{v}</p>
                </div>
              ))}
            </div>
            <button type="button" className="btn-ghost mt-5" onClick={restart}>Start again</button>
          </div>
        )}
      </div>
    </div>
  );
}
