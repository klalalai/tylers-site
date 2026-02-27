import Image from "next/image";
import QuoteForm from "./components/quoteform";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["700", "800"] });

export default function Home() {
  return (
    <main className={`${inter.className} min-h-screen bg-neutral-950 text-white`}>
      {/* subtle background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* ===== HERO HEADER ===== */}
        <section className="space-y-10">
          {/* Logo + Headline */}
          <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:items-center">
            <div className="relative h-56 w-56">
              <Image
                src="/fullsendlogo.png"
                alt="Full Send Wrap Co."
                fill
                className="object-contain"
                priority
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                Breckenridge, Colorado
              </p>
              <h1
                className={`${montserrat.className} mt-3 text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl`}
              >
                Custom Graphics &amp; RideWrap Install
              </h1>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Snowmobile",
                  "Mountain Bike",
                  "Dirt Bike",
                  "Snowbike",
                  "SxS",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-sky-300/30 bg-sky-300/20 px-5 py-2 text-sm font-medium text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ===== IMAGE + FORM ===== */}
          <div className="grid gap-12 lg:grid-cols-[1fr_520px]">
            {/* Left Column: Image + Key Services */}
            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
                <Image
                  src="/snowmobile.png"
                  alt="Wrapped snowmobile"
                  width={1400}
                  height={900}
                  className="w-full object-cover"
                  priority
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base font-medium text-white/90">
                <span className="inline-flex items-center gap-2">
                  <span className="text-white/70">✓</span>
                  <span>Graphics</span>
                </span>
                <span className="text-white/35">•</span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-white/70">✓</span>
                  <span>Paint Protection</span>
                </span>
                <span className="text-white/35">•</span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-white/70">✓</span>
                  <span>Install</span>
                </span><span className="text-white/35">•</span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-white/70">✓</span>
                  <span>Vinyl Install</span>
                </span>
              </div>
            </div>

            {/* Form Column */}
            <div id="quote">
              <h2
                className={`${montserrat.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
              >
                Request a Quote
              </h2>
              <p className="mt-3 text-white/70">
                Share a few details and we will get back to you.
              </p>

              <div className="mt-8 rounded-2xl bg-black/20 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>
        <div className="mt-16 h-px bg-white/10" />

        {/* ===== SERVICES ===== */}
        <section className="mt-16">
          <h2
            className={`${montserrat.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
          >
            Services
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              <div className="text-xs uppercase tracking-widest text-white/50">
                Graphics
              </div>
              <div className={`${montserrat.className} mt-3 text-xl font-semibold`}>
                Custom Wrap Kits
              </div>
              <p className="mt-3 text-sm text-white/70">
                Fully custom graphics built for your machine and your style.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              <div className="text-xs uppercase tracking-widest text-white/50">
                Paint Protection
              </div>
              <div className={`${montserrat.className} mt-3 text-xl font-semibold`}>
                PPF / High-Wear Zones
              </div>
              <p className="mt-3 text-sm text-white/70">
                Protect the spots that get abused so your sled or bike stays clean longer.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              <div className="text-xs uppercase tracking-widest text-white/50">
                Not Sure
              </div>
              <div className={`${montserrat.className} mt-3 text-xl font-semibold`}>
                We’ll Guide You
              </div>
              <p className="mt-3 text-sm text-white/70">
                Tell us what you ride and what you want it to look like.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-16 h-px bg-white/10" />

        {/* ===== HOW IT WORKS ===== */}
        <section className="mt-20">
          <div>
            <h2
              className={`${montserrat.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
            >
              How it Works
            </h2>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border-l-2 border-sky-300/60 bg-white/5 p-6 pl-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                  Step 1
                </div>
                <div className={`${montserrat.className} mt-2 text-xl font-semibold`}>
                  Request a quote
                </div>
                <p className="mt-2 text-sm text-white/70">
                  Tell us what you ride and what you want it to look like.
                </p>
              </div>

              <div className="rounded-2xl border-l-2 border-sky-300/60 bg-white/5 p-6 pl-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                  Step 2
                </div>
                <div className={`${montserrat.className} mt-2 text-xl font-semibold`}>
                  Confirm details
                </div>
                <p className="mt-2 text-sm text-white/70">
                  We’ll align on design direction, materials, timing, and pricing.
                </p>
              </div>

              <div className="rounded-2xl border-l-2 border-sky-300/60 bg-white/5 p-6 pl-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                  Step 3
                </div>
                <div className={`${montserrat.className} mt-2 text-xl font-semibold`}>
                  Print + install
                </div>
                <p className="mt-2 text-sm text-white/70">
                  Clean install that holds up to real use—then it’s ready to ride.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-24 pt-8 text-sm text-white/50">
          © {new Date().getFullYear()} Full Send Wrap Co.
        </footer>
      </div>
    </main>
  );
}