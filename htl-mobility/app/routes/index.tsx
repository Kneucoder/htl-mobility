import { createFileRoute, Link } from "@tanstack/react-router";
import { Ambulance, CalendarClock, ShieldCheck } from "lucide-react";
import { FleetCanvas } from "@/components/fleet-canvas";
import { SiteShell } from "@/components/site-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Non-emergency medical transport",
      "H.T.L Mobility schedules wheelchair, stretcher, and ambulatory rides across Illinois for clinics, dialysis, and hospital discharge. Not an emergency ambulance.",
    ),
  component: Home,
});

const steps = [
  { n: "01", t: "Tell us the trip", d: "City, time window, and mobility aid. Leave diagnoses and member IDs off the form." },
  { n: "02", t: "We match a vehicle", d: "Lift van, stretcher unit, or sedan, with the equipment the reservation actually needs." },
  { n: "03", t: "Door-through-door", d: "Drivers stay with the rider from the curb to the clinic entrance and back." },
];

function Home() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Non-emergency · Scheduled care</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display">The ride between home and the appointment.</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            H.T.L Mobility moves wheelchairs, stretchers, and walkers across Illinois — not emergencies. Drivers have 20 years of experience. Red-marked fleet, published privacy rules, and a booking form that refuses protected health details.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/request" className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-ink shadow hover:bg-primary-deep transition-colors">
              Schedule a trip
            </Link>
            <Link to="/fleet" className="inline-flex min-h-12 items-center rounded-full border border-line bg-surface px-6 text-sm font-medium hover:bg-line/50 transition-colors">
              See the fleet & 3D models
            </Link>
          </div>
        </div>
        <FleetCanvas className="h-80 rounded-card shadow-lg md:h-[30rem]" />
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
        {[
          { icon: Ambulance, t: "Right vehicle", d: "Wheelchair lifts, stretcher decks, and ambulatory sedans. No lights-and-sirens." },
          { icon: ShieldCheck, t: "Minimum necessary", d: "We ask for logistics, not charts. HIPAA patterns are written into the site, not just a badge." },
          { icon: CalendarClock, t: "All of Illinois", d: "Standing dialysis, therapy series, and discharge windows anywhere in the state, booked ahead." },
        ].map((card) => (
          <article key={card.t} className="rounded-card border border-line bg-surface p-6 shadow-sm">
            <card.icon className="h-7 w-7 text-primary" aria-hidden />
            <h2 className="mt-4 text-2xl font-display">{card.t}</h2>
            <p className="mt-2 text-muted text-sm">{card.d}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4">
        <h2 className="text-3xl font-display">How a reservation moves</h2>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-card bg-primary-deep p-6 text-primary-ink shadow-md">
              <p className="font-display text-3xl text-primary-ink/70">{s.n}</p>
              <h3 className="mt-2 text-2xl font-display">{s.t}</h3>
              <p className="mt-2 text-sm text-primary-ink/80">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "H.T.L Mobility",
            description: "Non-emergency medical transportation across Illinois.",
            telephone: "+1-555-014-2200",
            areaServed: { "@type": "State", name: "Illinois" },
          }),
        }}
      />
    </SiteShell>
  );
}