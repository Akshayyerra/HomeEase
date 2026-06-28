const steps = [
  {
    number: "01",
    title: "Choose a service",
    description:
      "Browse 50+ services across cleaning, repairs, beauty, and appliances. Filter by category or search.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Pick a slot",
    description:
      "Select a date and time that works for you — same-day and scheduled options available.",
    icon: "📅",
  },
  {
    number: "03",
    title: "Pro arrives",
    description:
      "A background-verified professional reaches your door equipped with all tools and supplies.",
    icon: "🚀",
  },
  {
    number: "04",
    title: "Pay & rate",
    description:
      "Pay securely via UPI, card, or cash. Rate your pro and help others make great choices.",
    icon: "⭐",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: "#f8fffe" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium mb-2" style={{ color: "#1D9E75" }}>
            Simple process
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Book in 3 minutes, sorted.
          </h2>
          <p className="mt-4 text-gray-500 max-w-md mx-auto text-base">
            No calls, no haggling. Just pick a service, a time, and we handle the rest.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ background: "repeating-linear-gradient(90deg,#1D9E75 0,#1D9E75 8px,transparent 8px,transparent 16px)" }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-md transition-shadow"
            >
              {/* Step number badge */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white mb-5 relative z-10"
                style={{ background: "#1D9E75" }}
              >
                {i + 1}
              </div>

              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
