import { z } from "zod";

const phi =
  /\b(ssn|social security|diagnosis|diagnosed|dx|icd-?\d|mrn|member id|medicaid id|medicare id|dob|date of birth|medication|prescription|rx|hiv|cancer|diabetes)\b|\d{3}-\d{2}-\d{4}|\b\d{9}\b/i;

const city = z
  .string()
  .trim()
  .min(2)
  .max(60)
  .regex(/^[a-zA-Z][a-zA-Z .'-]*$/, "Use a city name only, with no numbers or clinical notes.");

const clean = z
  .object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(80)
      .regex(/^[a-zA-Z][a-zA-Z .'-]*$/, "Use the name the driver should ask for. No numbers or account IDs."),
    phone: z
      .string()
      .trim()
      .transform((value) => value.replace(/[^\d]/g, ""))
      .refine((value) => value.length === 10, "Enter a 10-digit callback phone."),
    from: city,
    to: city,
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a trip date."),
    mobility: z.enum(["Ambulatory", "Wheelchair", "Stretcher"]),
    consent: z.literal(true, { message: "Confirm this inquiry has no health details." }),
  })
  .superRefine((value, ctx) => {
    const blob = `${value.name} ${value.from} ${value.to}`;
    if (phi.test(blob)) {
      ctx.addIssue({
        code: "custom",
        message:
          "Remove diagnoses, member IDs, Social Security numbers, and medication names. This form is for the trip only.",
      });
    }
    const day = new Date(`${value.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const limit = new Date(today);
    limit.setDate(limit.getDate() + 180);
    if (Number.isNaN(day.getTime()) || day < today || day > limit) {
      ctx.addIssue({
        code: "custom",
        message: "Choose a date from today through the next six months.",
      });
    }
  });

export type RideInquiry = z.infer<typeof clean>;

export function parseRideInquiry(input: unknown): RideInquiry {
  const parsed = clean.safeParse(input);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "This inquiry cannot be accepted.");
  }
  return parsed.data;
}