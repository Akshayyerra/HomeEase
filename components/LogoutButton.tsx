"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="mt-6 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
}