"use client";
import { useState } from "react";

const chips = [
  { label: "Home Cleaning", icon: "🧹" },
  { label: "Plumbing", icon: "🔧" },
  { label: "Electrician", icon: "⚡" },
  { label: "Beauty & Salon", icon: "💇" },
  { label: "AC Repair", icon: "❄️" },
  { label: "Appliances", icon: "🔌" },
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#f0faf6] to-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
        style={{ background: "#1D9E75" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-5"
        style={{ background: "#1D9E75" }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border"
          style={{ background: "#E1F5EE", color: "#0F6E56", borderColor: "#9FE1CB" }}>
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          We are in Warangal Hanmakonda Kazipet
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight tracking-tight mb-6">
          Home services,{" "}
          <span style={{ color: "#1D9E75" }}>done right.</span>
        </h1>

        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Verified professionals for cleaning, repairs, beauty & more —
          at your doorstep, on your schedule.
        </p>

        {/* Search bar */}
        <div className="flex max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="flex items-center pl-4 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="flex-1 px-4 py-4 text-gray-900 text-base outline-none bg-transparent placeholder-gray-400"
            placeholder="What service do you need?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="m-2 px-6 py-3 text-sm font-medium text-white rounded-xl transition"
            style={{ background: "#1D9E75" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#0F6E56")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#1D9E75")}
          >
            Search
          </button>
        </div>

        {/* Quick filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {chips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => setActive(active === chip.label ? null : chip.label)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border transition-all"
              style={
                active === chip.label
                  ? { background: "#1D9E75", color: "#fff", borderColor: "#1D9E75" }
                  : { background: "#fff", color: "#374151", borderColor: "#E5E7EB" }
              }
            >
              <span>{chip.icon}</span>
              {chip.label}
            </button>
          ))}
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          {[
            { icon: "✅", text: "Background-verified pros" },
            { icon: "⭐", text: "4.8 avg rating" },
            { icon: "🕐", text: "Same-day booking" },
            { icon: "🔒", text: "Secure payments" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
