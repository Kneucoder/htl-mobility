import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { parseRideInquiry } from "@/lib/ride-inquiry";
import { submitRideInquiry } from "@/lib/submit-ride";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/request")({
  head: () =>
    pageHead("Request a ride", "Scheduling inquiry for non-emergency medical transport. Do not include diagnoses or insurance identifiers."),
  component: Request,
});

const field =
  "mt-1 w-full rounded-xl border border-line bg-surface px-3 py-3 text-ink outline-none focus:border-primary transition-colors";

function Request() {
  const send = useServerFn(submitRideInquiry);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  return (
    <SiteShell>
      <PageIntro
        eyebrow="Scheduling"
        title="Request a non-emergency ride."
        lede="The desk accepts logistics only. Health details are rejected, and the inquiry itself is not stored."
      />
      <form
        className="mx-auto grid max-w-xl gap-5 px-4 mb-16"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setReference("");
          const form = new FormData(e.currentTarget);
          const input = {
            name: String(form.get("name") ?? ""),
            phone: String(form.get("phone") ?? ""),
            from: String(form.get("from") ?? ""),
            to: String(form.get("to") ?? ""),
            date: String(form.get("date") ?? ""),
            mobility: String(form.get("mobility") ?? ""),
            consent: form.get("consent") === "yes",
          };
          try {
            parseRideInquiry(input);
          } catch (err) {
            setError(err instanceof Error ? err.message : "This inquiry cannot be accepted.");
            return;
          }
          setPending(true);
          try {
            const result = await send({ data: input });
            setReference(result.reference);
            e.currentTarget.reset();
          } catch (err) {
            setError(err instanceof Error ? err.message : "This inquiry cannot be accepted.");
          } finally {
            setPending(false);
          }
        }}
      >
        <label className="text-sm font-medium">
          Name the driver should ask for
          <input required name="name" autoComplete="name" className={field} />
        </label>
        <label className="text-sm font-medium">
          Callback phone
          <input required name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Pickup city
            <input required name="from" autoComplete="address-level2" className={field} />
          </label>
          <label className="text-sm font-medium">
            Destination city
            <input required name="to" autoComplete="address-level2" className={field} />
          </label>
        </div>
        <label className="text-sm font-medium">
          Date
          <input required name="date" type="date" className={field} />
        </label>
        <fieldset>
          <legend className="text-sm font-medium">Mobility</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {["Ambulatory", "Wheelchair", "Stretcher"].map((m) => (
              <label
                key={m}
                className="flex min-h-11 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm cursor-pointer hover:border-primary/50 transition-colors"
              >
                <input type="radio" name="mobility" value={m} required className="text-primary focus:ring-primary" />
                {m}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex items-start gap-3 text-sm cursor-pointer">
          <input className="mt-1 rounded border-line text-primary focus:ring-primary" type="checkbox" name="consent" value="yes" required />
          <span>
            I am sending trip logistics only. I am not including a diagnosis, medication, member ID, or Social Security number.
          </span>
        </label>
        <p className="rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary-deep font-medium">
          If you need lights, a siren, or immediate clinical care, call 911 instead.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 rounded-full bg-primary text-sm font-medium text-primary-ink shadow hover:bg-primary-deep disabled:opacity-60 transition-colors"
        >
          {pending ? "Checking…" : "Submit scheduling inquiry"}
        </button>
        {error && (
          <p role="alert" className="rounded-xl border border-primary bg-surface p-4 text-sm text-primary-deep shadow-sm">
            {error}
          </p>
        )}
        {reference && (
          <p role="status" className="rounded-xl border border-line bg-surface p-4 text-sm shadow-sm">
            Accepted as <strong className="font-semibold text-primary">{reference}</strong>. The details were not saved. A staffed desk would call to confirm a vehicle — this demo does not place that call.
          </p>
        )}
      </form>
    </SiteShell>
  );
}