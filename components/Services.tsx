const services = [
  {
    title: "Home Cleaning",
    description:
      "Deep clean, regular clean, sofa cleaning, bathroom scrub, and post-renovation cleanup.",
    icon: "🧹",
    color: "#E1F5EE",
    iconColor: "#0F6E56",
    tags: ["Deep Clean", "Regular", "Move-in/out"],
    price: "From ₹299",
  },
  {
    title: "Plumbing & Electrician",
    description:
      "Pipe leaks, tap fittings, wiring, switchboard repairs, MCB replacement, and more.",
    icon: "🔧",
    color: "#E6F1FB",
    iconColor: "#185FA5",
    tags: ["Leak Fix", "Wiring", "Fittings"],
    price: "From ₹349",
  },
  {
    title: "Beauty & Salon",
    description:
      "Haircut, threading, waxing, facial, manicure, pedicure — all at your doorstep.",
    icon: "💇",
    color: "#FBEAF0",
    iconColor: "#993556",
    tags: ["Facial", "Waxing", "Hair"],
    price: "From ₹199",
  },
  {
    title: "AC Repair & Appliances",
    description:
      "AC service, gas refill, washing machine, refrigerator, geyser, and microwave repairs.",
    icon: "❄️",
    color: "#FAEEDA",
    iconColor: "#854F0B",
    tags: ["AC Service", "Washing Machine", "Fridge"],
    price: "From ₹449",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <p className="text-sm font-medium mb-2" style={{ color: "#1D9E75" }}>
              What we offer
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
              Every home need, covered.
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-medium flex items-center gap-1 shrink-0"
            style={{ color: "#1D9E75" }}
          >
            View all services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              {/* Color splash */}
              <div
                className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
                style={{ background: s.iconColor }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                style={{ background: s.color }}
              >
                {s.icon}
              </div>

              <h3 className="text-base font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full border"
                    style={{ background: s.color, color: s.iconColor, borderColor: "transparent" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold" style={{ color: s.iconColor }}>
                  {s.price}
                </span>
                <button
                  className="text-sm font-medium px-4 py-2 rounded-xl text-white transition"
                  style={{ background: s.iconColor }}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
