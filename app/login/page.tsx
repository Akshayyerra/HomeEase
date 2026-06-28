"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-96 rounded-lg border p-6 shadow-lg"
      >
        <h1 className="mb-6 text-2xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full rounded bg-green-600 p-3 text-white"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}