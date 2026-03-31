"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "both",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">&#127967;</div>
          <h1 className="font-display text-4xl tracking-wide text-copper mb-3">
            You&apos;re On the List
          </h1>
          <p className="text-slate text-lg">
            We&apos;ll send you an email as soon as the app is ready. Tight lines
            and straight shots.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col">
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          {/* Brand header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">&#127966;</span>
              <h1 className="font-display text-5xl sm:text-6xl tracking-wider text-copper">
                Afield &amp; Afloat
              </h1>
              <span className="text-4xl">&#127907;</span>
            </div>
            <p className="text-xl sm:text-2xl text-slate font-display tracking-wide">
              Your Hunting &amp; Fishing Journal
            </p>
          </div>

          {/* Value prop cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-bark rounded-xl p-6 border border-bark-light">
              <h2 className="font-display text-2xl tracking-wide text-olive-light mb-2">
                Afield
              </h2>
              <p className="text-slate text-sm leading-relaxed">
                Log every hunt &mdash; setup, sightings, calling sequences, shot
                details, harvest scoring, weather, and photos. Build your
                hunting journal season after season.
              </p>
            </div>
            <div className="bg-bark rounded-xl p-6 border border-bark-light">
              <h2 className="font-display text-2xl tracking-wide text-copper-light mb-2">
                Afloat
              </h2>
              <p className="text-slate text-sm leading-relaxed">
                Track every catch &mdash; species, lures, water conditions, fly
                patterns, structure, weather, and photos. See what works and
                where the fish are biting.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="text-center mb-10">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate">
              <span>&#9678; Auto weather logging</span>
              <span>&#9678; 20+ photos per entry</span>
              <span>&#9678; Sightings timeline</span>
              <span>&#9678; Harvest scoring</span>
              <span>&#9678; Trip summaries</span>
              <span>&#9678; 100% free to start</span>
            </div>
          </div>

          {/* Signup form */}
          <div className="bg-bark rounded-xl p-6 sm:p-8 border border-bark-light max-w-md mx-auto">
            <h3 className="font-display text-2xl tracking-wide text-center text-foreground mb-1">
              Get Early Access
            </h3>
            <p className="text-slate text-sm text-center mb-6">
              Sign up and we&apos;ll email you when the app is ready.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-background border border-bark-light rounded-lg text-foreground placeholder:text-slate/50 focus:outline-none focus:border-copper transition"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-background border border-bark-light rounded-lg text-foreground placeholder:text-slate/50 focus:outline-none focus:border-copper transition"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate mb-1">
                  Phone <span className="text-slate/50">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 bg-background border border-bark-light rounded-lg text-foreground placeholder:text-slate/50 focus:outline-none focus:border-copper transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate mb-2">
                  I&apos;m interested in
                </label>
                <div className="flex gap-3">
                  {(
                    [
                      ["both", "Both"],
                      ["hunting", "Afield"],
                      ["fishing", "Afloat"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm({ ...form, interest: value })}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition ${
                        form.interest === value
                          ? "bg-olive border-olive-light text-foreground"
                          : "bg-background border-bark-light text-slate hover:border-slate/50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {errorMsg && (
                <p className="text-red-400 text-sm text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 px-6 bg-copper hover:bg-copper-light text-background font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Signing up..." : "Join the Waitlist"}
              </button>
            </form>
          </div>

          <p className="text-center text-slate/50 text-xs mt-6">
            We&apos;ll only email you when the app launches. No spam, ever.
          </p>
        </div>
      </section>
    </main>
  );
}
