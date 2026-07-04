"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

interface NavbarProps {
  role?: string;
  isLoggedIn: boolean;
}

export default function Navbar({
  role,
  isLoggedIn,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold"
        >
          Home
          <span className="text-green-600">
            Ease
          </span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8 text-lg font-medium">
          <Link
            href="/"
            className="hover:text-green-600 transition"
          >
            Home
          </Link>

          {isLoggedIn && (
            <>
              <Link
                href="/book"
                className="hover:text-green-600 transition"
              >
                Book Service
              </Link>

              <Link
                href="/bookings"
                className="hover:text-green-600 transition"
              >
                My Bookings
              </Link>
            </>
          )}

          {role === "PROVIDER" && (
            <Link
              href="/worker"
              className="hover:text-green-600 transition"
            >
              Worker
            </Link>
          )}

          {role === "ADMIN" && (
            <Link
              href="/admin"
              className="hover:text-green-600 transition"
            >
              Admin
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="hover:text-green-600 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => signOut()}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}