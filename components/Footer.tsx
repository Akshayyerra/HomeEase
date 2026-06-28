const footerLinks = {
  Services: [
    "Home Cleaning",
    "Plumbing",
    "Electrician",
    "Beauty & Salon",
    "AC Repair",
    "Appliance Repair",
  ],
  Company: ["About us", "Careers", "Blog", "Press", "Partners"],
  Support: [
    "Help center",
    "Contact us",
    "Track booking",
    "Cancellation policy",
    "Safety",
  ],
  Cities: [
    "Hyderabad",
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Chennai",
    "Pune",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="text-xl font-semibold mb-3">
              <span className="text-white">Home</span>
              <span style={{ color: "#1D9E75" }}>Ease</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 mb-6">
              Trusted home services at your doorstep, across 25+ cities in India.
            </p>
            <div className="flex gap-3">
              {["𝕏", "in", "f", "▶"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-xs text-gray-400 hover:bg-gray-700 hover:text-white transition"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-white mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© 2025 HomeEase Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy policy", "Terms of service", "Cookie policy"].map((link) => (
              <a key={link} href="#" className="hover:text-gray-400 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
