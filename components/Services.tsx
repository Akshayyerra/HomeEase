const services = [
  {
    icon: "🧹",
    title: "Home Cleaning",
    desc: "Professional home cleaning services.",
  },
  {
    icon: "🔧",
    title: "Plumbing",
    desc: "Expert plumbers at your doorstep.",
  },
  {
    icon: "❄️",
    title: "AC Repair",
    desc: "Quick AC installation and repair.",
  },
  {
    icon: "⚡",
    title: "Electrician",
    desc: "Trusted electrical services.",
  },
  {
    icon: "💇",
    title: "Salon at Home",
    desc: "Beauty services at your home.",
  },
  {
    icon: "🛠️",
    title: "Appliance Repair",
    desc: "Repair services for home appliances.",
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">
                {service.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-2">
                {service.title}
              </h3>

              <p className="text-gray-600">
                {service.desc}
              </p>

              <a
                href="/book"
                className="inline-block mt-6 bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}