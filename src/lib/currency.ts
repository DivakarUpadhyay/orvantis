// All prices are stored in Indian rupees (INR). Taiwan prices (TWD) are derived
// from one reference rate so they can be updated in a single place, e.g. via
// NEXT_PUBLIC_TWD_PER_INR in Vercel. Final invoice amounts are always confirmed
// in the order confirmation or quote.
export const TWD_PER_INR = Number(process.env.NEXT_PUBLIC_TWD_PER_INR ?? 0.36);

export function toTwd(inr: number) {
  const twd = inr * TWD_PER_INR;
  // Round to friendly amounts: whole dollars for small items, tens otherwise.
  return twd < 1000 ? Math.round(twd) : Math.round(twd / 10) * 10;
}

export const fmtInr = (inr: number) => `₹${Math.round(inr).toLocaleString("en-IN")}`;
export const fmtTwd = (inr: number) => `NT$${toTwd(inr).toLocaleString("en-US")}`;

/** "₹20,150 · NT$7,250" */
export const money = (inr: number) => `${fmtInr(inr)} · ${fmtTwd(inr)}`;
