import { z } from "zod";

export const budgets = [
  "Not sure yet",
  "Under ₹10 lakh / NT$360k",
  "₹10–40 lakh / NT$360k–1.4M",
  "₹40 lakh–1.25 crore / NT$1.4M–4.5M",
  "Above ₹1.25 crore / NT$4.5M+",
] as const;
export const timelines = ["ASAP", "1–3 months", "3–6 months", "6+ months", "Just exploring"] as const;

// Shared by the browser form and the API route so both validate identically.
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100, "Name is too long."),
  email: z.email("Please enter a valid email address.").max(200),
  company: z.string().trim().max(120, "Company name is too long.").optional().default(""),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .regex(/^[+()\d\s.-]*$/, "Use digits, spaces and + ( ) - only.")
    .optional()
    .default(""),
  country: z.string().trim().max(60).optional().default(""),
  service: z.string().trim().min(1, "Please choose the service you need.").max(100),
  budget: z.enum(budgets, { error: "Please choose a budget range." }),
  timeline: z.enum(timelines, { error: "Please choose a timeline." }),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters).")
    .max(5000, "Message is too long (5,000 characters max)."),
  consent: z.literal(true, { error: "Please agree so we can reply to you." }),
  // Honeypot: hidden from people, often filled in by bots.
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
