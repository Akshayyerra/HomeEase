import Link from "next/link";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import LogoutButton from "./LogoutButton";

export default async function NavLinks() {
  const session = await auth();

  let role = "";

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    role = user?.role || "";
  }

  return (
    <div className="flex items-center gap-6">
      <Link
        href="/"
        className="text-gray-700 hover:text-green-600 font-medium transition"
      >
        Home
      </Link>

      <Link
        href="/book"
        className="text-gray-700 hover:text-green-600 font-medium transition"
      >
        Book Service
      </Link>

      {session ? (
        <>
          <Link
            href="/bookings"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            My Bookings
          </Link>

          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            Dashboard
          </Link>

          {role === "ADMIN" && (
            <Link
              href="/admin"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Admin
            </Link>
          )}

          <LogoutButton />
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
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
      )}
    </div>
  );
}