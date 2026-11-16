import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    pageHead("How it works", "Book non-emergency medical transport in three steps: logistics only, vehicle match, door-through-door ride across Illinois."),
  component: How,
});

const rows = [
  ["Who can book", "The rider, a family coordinator, or a facility scheduler. We do not need a chart."],
  ["Lead time", "Same-day when a vehicle is free; standing routes are better booked 48 hours ahead."],
  ["What we need", "Name for the driver to ask for, phone, cities, time window, mobility class."],
  ["What we refuse", "Diagnoses, medications, insurance member IDs, Social Security numbers, photos of the rider."],
  ["At the curb", "Driver confirms the name on the trip sheet. No clinical assessment."],
  ["After the trip", "A completion time is logged. Clinical notes are never written by H.T.L Mobility."],
  ["Who drives", "Drivers have 20 years of experience with wheelchair, stretcher, and ambulatory trips."],
  ["Where", "Service covers all of Illinois."],
];

function How() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Process"
        title="A thorough step-by-step path from request to curb."
        lede="Clear sections for trip logistics. Stricter data habits than a typical booking form."
      />
      <div className="mx-auto max-w-6xl px-4 space-y-8">
        <dl className="divide-y divide-line rounded-card border border-line bg-surface shadow-sm overflow-hidden">
          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-2 px-6 py-5 md:grid-cols-3">
              <dt className="font-medium text-ink">{k}</dt>
              <dd className="text-muted md:col-span-2">{v}</dd>
            </div>
          ))}
        </dl>
        <div>
          <Link
            to="/request"
            className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-ink shadow hover:bg-primary-deep transition-colors"
          >
            Request a ride
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}