import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-bold"
          >
            <span className="text-black">
              Home
            </span>
            <span className="text-green-600">
              Ease
            </span>
          </Link>

          {/* Navigation */}
          <nav>
            <NavLinks />
          </nav>
        </div>
      </div>
    </header>
  );
}