const pros = [
  {
    name: "Ramesh Kumar",
    role: "AC Technician",
    experience: "6 yrs exp",
    rating: 4.9,
    jobs: 834,
    initials: "RK",
    color: "#E1F5EE",
    textColor: "#0F6E56",
    badge: "Top Pro",
    specialty: "AC Repair & Appliances",
  },
  {
    name: "Priya Devi",
    role: "Beauty Expert",
    experience: "4 yrs exp",
    rating: 4.8,
    jobs: 612,
    initials: "PD",
    color: "#FBEAF0",
    textColor: "#993556",
    badge: "Verified",
    specialty: "Beauty & Salon",
  },
  {
    name: "Suresh Rao",
    role: "Plumber",
    experience: "8 yrs exp",
    rating: 4.9,
    jobs: 1102,
    initials: "SR",
    color: "#E6F1FB",
    textColor: "#185FA5",
    badge: "Top Pro",
    specialty: "Plumbing & Electrician",
  },
  {
    name: "Anita Joshi",
    role: "Cleaning Expert",
    experience: "3 yrs exp",
    rating: 4.7,
    jobs: 389,
    initials: "AJ",
    color: "#FAEEDA",
    textColor: "#854F0B",
    badge: "Verified",
    specialty: "Home Cleaning",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-3.5 h-3.5"
          fill={star <= Math.round(rating) ? "#EF9F27" : "#E5E7EB"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs font-medium text-gray-600 ml-1">{rating}</span>
    </div>
  );
}

export default function TopPros() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <p className="text-sm font-medium mb-2" style={{ color: "#1D9E75" }}>
              Our professionals
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              Trusted, trained, verified.
            </h2>
            <p className="mt-3 text-gray-500 max-w-md text-base">
              Every pro on HomeEase is background-checked, trained, and rated by real customers.
            </p>
          </div>
          <a
            href="#"
            className="text-sm font-medium flex items-center gap-1 shrink-0"
            style={{ color: "#1D9E75" }}
          >
            View all pros
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Pro cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pros.map((pro) => (
            <div
              key={pro.name}
              className="rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              {/* Avatar + badge */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-semibold text-lg"
                  style={{ background: pro.color, color: pro.textColor }}
                >
                  {pro.initials}
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: pro.color, color: pro.textColor }}
                >
                  {pro.badge}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 text-base mb-0.5">{pro.name}</h3>
              <p className="text-sm text-gray-500 mb-1">{pro.role} · {pro.experience}</p>
              <p className="text-xs text-gray-400 mb-3">{pro.specialty}</p>

              <StarRating rating={pro.rating} />

              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs text-gray-400">{pro.jobs.toLocaleString()} jobs done</span>
                <button
                  className="text-xs font-medium px-3 py-1.5 rounded-lg text-white"
                  style={{ background: "#1D9E75" }}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verification badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {[
            "✅ Government ID verified",
            "🛡️ Police background check",
            "📋 Skills assessment passed",
            "🏆 Certified training completed",
          ].map((item) => (
            <div key={item} className="text-sm text-gray-500 flex items-center gap-1">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
