export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div
        className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)" }}
      >
        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: "#fff", transform: "translate(30%, -30%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
          style={{ background: "#fff", transform: "translate(-30%, 30%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 px-8 py-16 sm:px-16 text-center">
          {/* Offer badge */}
          <div
            className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            🎉 First booking offer
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Get ₹200 off your<br />first service.
          </h2>
          <p className="text-lg mb-10" style={{ color: "#9FE1CB" }}>
            Use code <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">EASE200</span> at checkout.
            Valid for all first-time bookings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition hover:opacity-90"
              style={{ background: "#fff", color: "#0F6E56" }}
            >
              Book your first service
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold border-2 border-white/30 transition hover:bg-white/10"
              style={{ color: "#fff" }}
            >
              Become a professional
            </a>
          </div>

          {/* App store links */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <p className="text-sm" style={{ color: "#9FE1CB" }}>Also available on:</p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition"
              >
                📱 App Store
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition"
              >
                🤖 Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
