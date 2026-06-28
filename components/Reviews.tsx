const reviews = [
  {
    text: "The cleaning team was absolutely amazing. My house looked brand new after they were done. Super punctual and professional — will definitely book again!",
    name: "Vashista",
    location: "Kazipet",
    service: "Home Cleaning",
    rating: 5,
    initials: "NM",
    color: "#E1F5EE",
    textColor: "#0F6E56",
  },
  {
    text: "AC was fixed in under an hour. The technician explained what was wrong, showed me the part, and fixed it fast. Very fair pricing too.",
    name: "Akshay",
    location: "Warangal",
    service: "AC Repair",
    rating: 5,
    initials: "AK",
    color: "#E6F1FB",
    textColor: "#185FA5",
  },
  {
    text: "Home salon service was so convenient! Got a full facial and haircut without stepping out. The beautician was skilled and brought all equipment.",
    name: "Roni Bharath",
    location: "Hanmakonda",
    service: "Beauty & Salon",
    rating: 5,
    initials: "SS",
    color: "#FBEAF0",
    textColor: "#993556",
  },
  {
    text: "Had a plumbing emergency at 9 PM and they sent someone within the hour. Fixed everything cleanly. This is the kind of service you can depend on.",
    name: "Vikram Nair",
    location: "",
    service: "Plumbing",
    rating: 5,
    initials: "VN",
    color: "#FAEEDA",
    textColor: "#854F0B",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4" fill={i < count ? "#EF9F27" : "#E5E7EB"} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "#f8fffe" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium mb-2" style={{ color: "#1D9E75" }}>
            Customer reviews
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Real people, real experiences.
          </h2>
          <p className="mt-4 text-gray-500 max-w-sm mx-auto">
            Over 1,20,000 reviews and counting. Hear what our customers say.
          </p>
          {/* Overall rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="text-5xl font-bold text-gray-900">4.8</span>
            <div className="text-left">
              <StarRating count={5} />
              <p className="text-sm text-gray-400 mt-1">Based on 1,20,000+ reviews</p>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <StarRating count={r.rating} />
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 pt-5 border-t border-gray-50">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                  style={{ background: r.color, color: r.textColor }}
                >
                  {r.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-400">
                    {r.location} · {r.service}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
