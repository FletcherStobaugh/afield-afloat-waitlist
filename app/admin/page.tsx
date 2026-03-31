"use client";

import { useState } from "react";

interface Signup {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  interest: string;
  created_at: string;
}

export default function Admin() {
  const [key, setKey] = useState("");
  const [signups, setSignups] = useState<Signup[]>([]);
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    const res = await fetch(`/api/waitlist?key=${encodeURIComponent(key)}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to load");
      return;
    }
    setSignups(data.signups);
    setCount(data.count);
    setLoaded(true);
  }

  if (!loaded) {
    return (
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <h1 className="font-display text-3xl tracking-wide text-copper text-center mb-6">
            Admin
          </h1>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load()}
            placeholder="Admin key"
            className="w-full px-4 py-3 bg-background border border-bark-light rounded-lg text-foreground placeholder:text-slate/50 focus:outline-none focus:border-copper transition mb-3"
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            onClick={load}
            className="w-full py-3 bg-copper hover:bg-copper-light text-background font-semibold rounded-lg transition"
          >
            View Signups
          </button>
        </div>
      </main>
    );
  }

  const hunting = signups.filter((s) => s.interest === "hunting" || s.interest === "both").length;
  const fishing = signups.filter((s) => s.interest === "fishing" || s.interest === "both").length;

  return (
    <main className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
      <h1 className="font-display text-3xl tracking-wide text-copper mb-6">
        Waitlist Signups ({count})
      </h1>

      <div className="flex gap-4 mb-6">
        <div className="bg-bark rounded-lg p-4 border border-bark-light flex-1">
          <div className="text-2xl font-bold text-olive-light">{hunting}</div>
          <div className="text-slate text-sm">Want Afield (hunting)</div>
        </div>
        <div className="bg-bark rounded-lg p-4 border border-bark-light flex-1">
          <div className="text-2xl font-bold text-copper-light">{fishing}</div>
          <div className="text-slate text-sm">Want Afloat (fishing)</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-bark-light text-slate text-left">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Phone</th>
              <th className="py-2 pr-4">Interest</th>
              <th className="py-2">Signed Up</th>
            </tr>
          </thead>
          <tbody>
            {signups.map((s) => (
              <tr key={s.id} className="border-b border-bark-light/50">
                <td className="py-2 pr-4 text-foreground">{s.name}</td>
                <td className="py-2 pr-4 text-copper">{s.email}</td>
                <td className="py-2 pr-4 text-slate">{s.phone || "—"}</td>
                <td className="py-2 pr-4">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      s.interest === "both"
                        ? "bg-slate/20 text-foreground"
                        : s.interest === "hunting"
                        ? "bg-olive/30 text-olive-light"
                        : "bg-copper/20 text-copper-light"
                    }`}
                  >
                    {s.interest === "both" ? "Both" : s.interest === "hunting" ? "Afield" : "Afloat"}
                  </span>
                </td>
                <td className="py-2 text-slate">
                  {new Date(s.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {signups.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate">
                  No signups yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
