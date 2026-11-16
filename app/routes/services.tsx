import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead("Services", "Wheelchair, stretcher, and ambulatory non-emergency medical transportation for appointments, dialysis, and discharge across Illinois."),
  component: Services,
});

const items = [
  { t: "Wheelchair", d: "Lift-equipped vans with four-point securement and space for a folding chair or a rider who stays seated." },
  { t: "Stretcher", d: "Supine transport for riders who cannot sit. Oxygen tanks travel only when the facility has already arranged them." },
  { t: "Ambulatory", d: "Sedan or van for riders who walk with a cane, walker, or a steady arm — no clinical procedures en route." },
  { t: "Discharge windows", d: "Hospital-to-home trips timed to the unit’s release, with a second stop only if it was booked." },
  { t: "Recurring care", d: "Standing dialysis and therapy routes on the same weekdays, same vehicle class." },
  { t: "Facility contracts", d: "Clinics can reserve blocks. Billing stays with the account, not a rider’s chart." },
];

function Services() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Services"
        title="Transport levels, not treatment."
        lede="Every service is a ride. Drivers do not diagnose, medicate, or carry records beyond the trip sheet."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.t} className="rounded-card border border-line bg-surface p-6 shadow-sm">
            <h2 className="text-2xl font-display">{item.t}</h2>
            <p className="mt-2 text-muted">{item.d}</p>
          </article>
        ))}
      </section>
      <div className="mx-auto max-w-6xl px-4 mt-8">
        <Link to="/request" className="inline-flex items-center text-primary font-semibold hover:underline">
          Start a scheduling inquiry →
        </Link>
      </div>
    </SiteShell>
  );
}