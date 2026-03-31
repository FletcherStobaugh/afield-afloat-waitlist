"use client";

import { useState } from "react";

function FeatureSection({
  title,
  color,
  items,
}: {
  title: string;
  color: "olive" | "copper" | "slate";
  items: string[];
}) {
  const colorMap = {
    olive: "text-olive-light",
    copper: "text-copper-light",
    slate: "text-slate",
  };
  return (
    <div className="bg-bark rounded-xl p-5 border border-bark-light">
      <h3
        className={`font-display text-xl tracking-wide ${colorMap[color]} mb-3`}
      >
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-slate text-sm leading-relaxed flex gap-2">
            <span className="text-slate/40 shrink-0">&#8226;</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "both",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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
            We&apos;ll send you an email as soon as the app is ready. Tight
            lines and straight shots.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col">
      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Brand header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">&#127966;</span>
              <h1 className="font-display text-5xl sm:text-6xl tracking-wider text-copper">
                Afield &amp; Afloat
              </h1>
              <span className="text-4xl">&#127907;</span>
            </div>
            <p className="text-xl sm:text-2xl text-slate font-display tracking-wide mb-2">
              Your Hunting &amp; Fishing Journal
            </p>
            <p className="text-copper font-display text-lg tracking-wide">
              155+ Fields Per Entry &mdash; Every Detail, Every Trip
            </p>
          </div>

          {/* Intro cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-bark rounded-xl p-6 border border-bark-light">
              <h2 className="font-display text-2xl tracking-wide text-olive-light mb-2">
                Afield
              </h2>
              <p className="text-slate text-sm leading-relaxed">
                The most detailed hunting journal ever built. Log every sit,
                every sighting, every shot, every harvest &mdash; with
                automatic weather, moon phase, and solunar data.
              </p>
            </div>
            <div className="bg-bark rounded-xl p-6 border border-bark-light">
              <h2 className="font-display text-2xl tracking-wide text-copper-light mb-2">
                Afloat
              </h2>
              <p className="text-slate text-sm leading-relaxed">
                The most detailed fishing journal ever built. Log every catch
                individually with lure, depth, structure, retrieve, water
                conditions, tides, and fly fishing support.
              </p>
            </div>
          </div>

          {/* CTA + Form */}
          <div className="bg-bark rounded-xl p-6 sm:p-8 border border-bark-light max-w-md mx-auto mb-4">
            <h3 className="font-display text-2xl tracking-wide text-center text-foreground mb-1">
              Get Early Access
            </h3>
            <p className="text-slate text-sm text-center mb-6">
              Sign up and we&apos;ll email you when the app is ready.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate mb-1"
                >
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate mb-1"
                >
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
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate mb-1"
                >
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

          <p className="text-center text-slate/50 text-xs mb-10">
            We&apos;ll only email you when the app launches. No spam, ever.
          </p>

          {/* Scroll down note */}
          <div className="text-center mb-10">
            <p className="text-slate text-sm mb-2">
              Want to see everything these apps can do?
            </p>
            <p className="text-copper font-display text-lg tracking-wide">
              Scroll down for the full 155+ feature list
            </p>
            <div className="text-slate/40 text-2xl mt-2 animate-bounce">&#8595;</div>
          </div>

          <hr className="border-bark-light mb-10" />

          {/* ── HUNTING FEATURES ── */}
          <div className="mb-6">
            <h2 className="font-display text-3xl tracking-wide text-olive-light text-center mb-6">
              Afield &mdash; Hunting Features
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <FeatureSection
                title="Hunt Setup &amp; Location"
                color="olive"
                items={[
                  "14 hunt methods — treestand, ground blind, saddle, spot & stalk, still hunt, driven hunt, dog hunt, calling, decoying, pit blind, layout blind, boat/kayak, walk-in, tower stand",
                  "Stand/blind type, height, and direction facing",
                  "Setup time",
                  "Scent control method",
                  "Camo pattern",
                  "Access and entry notes",
                  "GPS coordinates auto-captured",
                  "Location name and state",
                  "Property type — public land, private, lease, outfitter, military, tribal",
                  "16 habitat types — hardwoods, pines, mixed timber, ag field edge, corn/beans, CRP/grassland, food plot, creek bottom, river bottom, ridge top, saddle, funnel, clear cut, swamp, prairie, desert",
                  "Food sources and land management notes",
                  "Trail cam correlation",
                ]}
              />
              <FeatureSection
                title="Sightings Timeline"
                color="olive"
                items={[
                  "Log every animal you see — unlimited sightings per entry",
                  "Timestamped for tracking movement patterns",
                  "Species, sex, and age estimate (fawn, 1.5yr, 2.5yr, 3.5yr, 4.5+yr, mature)",
                  "Distance and direction (8-point compass)",
                  "Count per sighting",
                  "15 behaviors — feeding, walking, running, bedded, standing, chasing, cruising, seeking, fighting, calling, flying, swimming, spooked, unaware, alert",
                  "Notes per sighting",
                ]}
              />
              <FeatureSection
                title="Sign &amp; Hunting Pressure"
                color="olive"
                items={[
                  "13 sign types — fresh rubs, old rubs, fresh scrapes, old scrapes, tracks, beds, droppings, trails, browse lines, shed antlers, wallows, feathers, nests",
                  "Rut phase — pre-rut, seeking, chasing, peak/lockdown, post-rut, second rut",
                  "Hunting pressure level (none to extreme)",
                  "Shots heard count",
                  "Other wildlife observed",
                ]}
              />
              <FeatureSection
                title="Calling &amp; Decoys"
                color="olive"
                items={[
                  "Call type and brand",
                  "Call cadence and strategy",
                  "Animal response — came in, no response, spooked",
                  "Decoy type",
                  "Decoy distance and positioning",
                ]}
              />
              <FeatureSection
                title="The Shot"
                color="olive"
                items={[
                  "Hit or miss",
                  "Shot distance (yards)",
                  "6 shot angles — broadside, quartering away, quartering to, head-on, straight down, going away",
                  "10 shot placements — double lung, heart, vitals, shoulder, neck, head, gut, ham/hindquarter, miss, unknown",
                  "7 weapon types — rifle, shotgun, compound bow, crossbow, recurve/longbow, muzzleloader, handgun",
                  "Weapon make/model/caliber",
                  "Ammo or broadhead type",
                  "Optic/sight used",
                  "Follow-up shot count",
                ]}
              />
              <FeatureSection
                title="Recovery"
                color="olive"
                items={[
                  "Blood trail color — bright red/arterial, dark red/liver, pink/frothy/lung, green/brown/gut, minimal/none",
                  "Blood trail amount — heavy, moderate, light, sparse, none",
                  "Tracking distance",
                  "Tracking time",
                  "Recovery method — blood trail, tracking dog, grid search, found dead, saw it fall, not recovered",
                ]}
              />
              <FeatureSection
                title="Harvest Scoring"
                color="olive"
                items={[
                  "Harvest species and sex",
                  "Age estimate",
                  "Field dressed weight and live weight estimate",
                  "Antler points, inside spread, main beam length",
                  "Boone & Crockett and Pope & Young compatible scoring",
                  "SCI and non-typical scoring",
                  "Body condition",
                  "Butcher yield (lbs)",
                  "Tag number and check station",
                  "Taxidermy plans",
                ]}
              />
            </div>
          </div>

          {/* ── FISHING FEATURES ── */}
          <div className="mb-6">
            <h2 className="font-display text-3xl tracking-wide text-copper-light text-center mb-6">
              Afloat &mdash; Fishing Features
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <FeatureSection
                title="Fishing Setup"
                color="copper"
                items={[
                  "16 fishing methods — casting, trolling, fly fishing, jigging, bottom fishing, drift, surf, ice, kayak, wade, bank, pier, float tube, bowfishing, trotline, noodling",
                  "Target species",
                  "Boat/platform type",
                  "Electronics used",
                ]}
              />
              <FeatureSection
                title="Individual Catch Log"
                color="copper"
                items={[
                  "Log every fish individually — unlimited catches per entry",
                  "Species, length, weight, girth",
                  "24 lure/bait types — crankbait, spinnerbait, jig, soft plastic, topwater, swimbait, spoon, blade bait, chatterbait, buzzbait, jerkbait, fly, live bait, cut bait, dough bait, spinner, inline spinner, drop shot, ned rig, texas rig, carolina rig, wacky rig, neko rig",
                  "Lure brand, model, color, and size",
                  "Retrieve speed — dead slow, slow, medium, fast, burning",
                  "Depth caught (ft)",
                  "26 structure types — point, hump, drop-off, ledge, weedline, grass bed, timber/laydown, brush pile, dock, riprap, rock pile, creek channel, flat, saddle, island, culvert, bridge piling, seawall, oyster bed, reef, open water, and more",
                  "Line type and weight",
                  "Hook set description",
                  "Fight duration",
                  "Kept or released",
                  "Star rating per catch",
                ]}
              />
              <FeatureSection
                title="Water Conditions"
                color="copper"
                items={[
                  "Water temperature",
                  "Water clarity (visibility in inches)",
                  "7 water colors — crystal clear, clear, lightly stained, stained, muddy, tannic/dark, green/algae",
                  "Water current and level",
                  "Tide stage and direction (auto-fetched from NOAA)",
                  "Thermocline depth",
                  "Auto nearest NOAA tide station lookup",
                ]}
              />
              <FeatureSection
                title="Fly Fishing"
                color="copper"
                items={[
                  "Hatch observed (BWO, caddis, PMD, etc.)",
                  "Fly pattern and size",
                  "6 fly methods — dry fly, nymph, streamer, wet fly, emerger, terrestrial",
                  "5 indicator types — strike indicator, euro/tight-line, dry-dropper, sight fishing, swing",
                  "Tippet size",
                ]}
              />
              <FeatureSection
                title="Pattern Tracking"
                color="copper"
                items={[
                  "What worked (productive patterns)",
                  "What didn't work",
                  "Peak activity times",
                  "Depth changes throughout the day",
                ]}
              />
            </div>
          </div>

          {/* ── SHARED FEATURES ── */}
          <div className="mb-10">
            <h2 className="font-display text-3xl tracking-wide text-foreground text-center mb-6">
              Both Apps
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <FeatureSection
                title="Automatic Weather"
                color="slate"
                items={[
                  "Temperature and feels-like",
                  "Humidity and dew point",
                  "Wind speed, direction (16-point compass), and gusts",
                  "Barometric pressure and trend (rising/steady/falling)",
                  "UV index",
                  "Sunrise and sunset times",
                  "First light and last light",
                  "All auto-pulled from OpenWeather API",
                ]}
              />
              <FeatureSection
                title="Moon &amp; Solunar Data"
                color="slate"
                items={[
                  "Moon phase (8 phases)",
                  "Moon illumination %",
                  "Solunar activity rating — Excellent, Very Good, Good, Fair, Slow",
                  "Major and minor feeding periods",
                  "Solunar phase day position",
                  "All calculated automatically",
                ]}
              />
              <FeatureSection
                title="Photos &amp; Media"
                color="slate"
                items={[
                  "Up to 20 photos per entry",
                  "Dual camera capture (front and back at the same time)",
                ]}
              />
              <FeatureSection
                title="Trip Logistics"
                color="slate"
                items={[
                  "Drive time and distance",
                  "Trip expenses",
                  "Companions",
                  "Gear list (unlimited tags)",
                  "Dog name and performance (flushes, retrieves, etc.)",
                ]}
              />
              <FeatureSection
                title="Reflection &amp; Rating"
                color="slate"
                items={[
                  "Overall trip rating (1-5 stars)",
                  "Confidence level before the trip",
                  "Difficulty rating",
                  "Would you repeat (thumbs up/down)",
                  "Highlights",
                  "Lessons learned",
                ]}
              />
              <FeatureSection
                title="Compliance &amp; Regulations"
                color="slate"
                items={[
                  "Regulation zone",
                  "Season bag count tracking",
                  "Tag number",
                  "Legal and regulation notes",
                ]}
              />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
