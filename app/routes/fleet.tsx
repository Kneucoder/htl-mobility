import { createFileRoute } from "@tanstack/react-router";
import { FleetCanvas } from "@/components/fleet-canvas";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/fleet")({
  head: () =>
    pageHead("Fleet", "Lift vans, stretcher units, and ambulatory vehicles serving all of Illinois. Interactive 3D models of H.T.L Mobility equipment."),
  component: Fleet,
});

const specs = [
  { t: "Lift van", d: "Side or rear lift, wheelchair securement, high roof. Marked in cardinal red, no emergency lighting." },
  { t: "Stretcher unit", d: "Locking deck, attendant jump seat, climate control. Used only when the reservation says stretcher." },
  { t: "Ambulatory sedan", d: "Low step-in, trunk space for a folded walker. Same privacy rules as the vans." },
];

function Fleet() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Fleet"
        title="Vehicles and animated 3D models."
        lede="The 3D model rotates and simulates movement live. It represents the van, wheelchair, and stretcher dispatched anywhere in Illinois by drivers with 20 years of experience."
      />
      <div className="mx-auto max-w-6xl px-4">
        <FleetCanvas className="h-[32rem] rounded-card shadow-lg" />
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {specs.map((s) => (
            <li key={s.t} className="rounded-card border border-line bg-surface p-6 shadow-sm">
              <h2 className="text-2xl font-display">{s.t}</h2>
              <p className="mt-2 text-sm text-muted">{s.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}