import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead(
      "Website privacy notice",
      "What the H.T.L Mobility public website collects. Scheduling inquiries are not stored.",
    ),
  component: Privacy,
});

function Privacy() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Privacy"
        title="What this website keeps."
        lede="Short on purpose. Search engines may index the public pages. The ride form does not save what you type."
      />
      <article className="mx-auto max-w-3xl space-y-4 px-4 text-muted mb-16">
        <p>
          Public pages: browser, approximate region from your connection, and the page you opened. Used to keep the site up and to understand which services people read.
        </p>
        <p>
          Scheduling form: validated on the server, then discarded. Do not type diagnoses, account numbers, or other health details. A production desk would publish a separate notice before any electronic storage.
        </p>
        <p>
          We do not sell contact lists. We do not place rider photos on the site. Emergency calls do not belong here — use 911.
        </p>
        <p>
          Questions about a future production record: privacy@htlmobility.example or (555) 014-2200.
        </p>
      </article>
    </SiteShell>
  );
}