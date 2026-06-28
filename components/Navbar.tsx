"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-1 text-xl font-semibold tracking-tight"
          >
            <span className="text-gray-900">Home</span>
            <span style={{ color: "#1D9E75" }}>Ease</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["Services", "How it works", "Cities", "Blog"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Become a pro
            </a>

            {session ? (
              <>
                <span className="text-sm font-medium text-gray-700">
                  Hi, {session.user?.name}
                </span>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-red-600 border border-red-200 rounded-lg px-4 py-2 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="text-sm text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:border-gray-300 transition"
              >
                Login
              </a>
            )}

            <a
              href="#"
              className="text-sm font-medium text-white px-5 py-2 rounded-lg transition"
              style={{ background: "#1D9E75" }}
            >
              Book now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {["Services", "How it works", "Cities", "Blog"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-sm text-gray-600 py-2"
            >
              {item}
            </a>
          ))}

          {session ? (
            <>
              <p className="text-sm text-gray-700">
                Hi, {session.user?.name}
              </p>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-center text-sm border border-red-300 rounded-lg py-2 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="block text-center text-sm border border-gray-200 rounded-lg py-2 text-gray-700"
            >
              Login
            </a>
          )}
        </div>
      )}
    </header>
  );
}