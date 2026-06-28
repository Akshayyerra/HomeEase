const stats = [
  { value: "50,000+", label: "Customers served", icon: "👥" },
  { value: "2,000+",  label: "Verified professionals", icon: "🛡️" },
  { value: "4.8 ★",  label: "Average rating", icon: "⭐" },
  { value: "25+",     label: "Cities covered", icon: "📍" },
  { value: "98%",     label: "On-time arrival", icon: "⏰" },
];

export default function Stats() {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8" style={{ background: "#1D9E75" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{s.icon}</span>
              <span className="text-3xl font-bold text-white tracking-tight">{s.value}</span>
              <span className="text-sm font-medium" style={{ color: "#9FE1CB" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
