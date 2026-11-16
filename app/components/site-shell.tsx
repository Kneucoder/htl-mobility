import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/fleet", label: "Fleet" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/compliance", label: "HIPAA" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="bg-primary text-primary-ink">
        <p className="mx-auto max-w-6xl px-4 py-2 text-center text-sm font-medium">
          Non-emergency medical transportation only. For a medical emergency, call 911.
        </p>
      </div>
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-xs font-semibold tracking-wide text-primary-ink">
              HTL
            </span>
            <span>
              <span className="block font-display text-xl leading-none">H.T.L Mobility</span>
              <span className="text-xs tracking-wide text-muted uppercase">Medical transport</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-ink/80 hover:text-primary transition-colors"
                activeProps={{ className: "text-primary font-semibold" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/request"
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-ink shadow-sm hover:bg-primary-deep transition-colors"
          >
            Request a ride
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t border-line bg-ink text-primary-ink">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">H.T.L Mobility</p>
            <p className="mt-2 text-sm text-primary-ink/75">
              Scheduled door-through-door transport across all of Illinois. Drivers bring 20 years of
              experience. We do not operate ambulances.
            </p>
          </div>
          <div className="text-sm">
            <p className="font-medium text-white">Visit</p>
            <p className="mt-2 text-primary-ink/75">Serving all of Illinois</p>
            <p className="text-primary-ink/75">Dispatch desk 6:00–20:00 local</p>
            <p className="text-primary-ink/75">(555) 014-2200</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/compliance" className="hover:underline text-primary-ink/80">HIPAA & privacy practices</Link>
            <Link to="/privacy" className="hover:underline text-primary-ink/80">Website privacy notice</Link>
            <Link to="/services" className="hover:underline text-primary-ink/80">Mobility levels</Link>
            <Link to="/request" className="hover:underline text-primary-ink/80">Scheduling inquiry</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  return (
    <header className="mx-auto max-w-6xl px-4 pb-6 pt-12">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl text-4xl md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{lede}</p>
    </header>
  );
}