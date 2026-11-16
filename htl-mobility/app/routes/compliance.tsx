import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/compliance")({
  head: () =>
    pageHead(
      "HIPAA design patterns",
      "How H.T.L Mobility designs public pages and scheduling inquiries to avoid collecting protected health information.",
    ),
  component: Compliance,
});

const patterns = [
  {
    t: "Minimum necessary on public forms",
    d: "The inquiry asks for a name the driver can call, a phone, two cities, a time, and a mobility class. There is no diagnosis, medication, or payer-ID field.",
  },
  {
    t: "No PHI in the address bar",
    d: "Pages are static marketing routes. Trip details are not placed in URLs, which would leak into server logs and browser history.",
  },
  {
    t: "Nothing stored from this form",
    d: "Submitting the form returns a reference code only. Details are not saved to a database. A live dispatch desk would use a vendor under a business associate agreement.",
  },
  {
    t: "Role separation",
    d: "Marketing copy, trip logistics, and any future clinical attachments stay in different systems. This website is the marketing system.",
  },
  {
    t: "Access and notice",
    d: "The privacy notice states what a production desk would collect, how long trip sheets are kept, and who to call to amend a record.",
  },
  {
    t: "Workforce habit",
    d: "Drivers carry a trip sheet, not a chart. Radios and texts stay on first name and address. Photos of riders are prohibited.",
  },
];

function Compliance() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Compliance"
        title="HIPAA as a layout decision."
        lede="H.T.L Mobility is a transportation company, not a covered clinic. When a facility shares trip details with us, we still design as if the minimum-necessary rule applies."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 mb-16">
        {patterns.map((p) => (
          <article key={p.t} className="rounded-card border border-line bg-surface p-6 shadow-sm">
            <h2 className="text-2xl font-display">{p.t}</h2>
            <p className="mt-2 text-muted">{p.d}</p>
          </article>
        ))}
        <p className="text-sm text-muted">
          This page is an operational design statement, not legal advice and not a Notice of Privacy Practices for a specific covered entity.
        </p>
      </div>
    </SiteShell>
  );
}