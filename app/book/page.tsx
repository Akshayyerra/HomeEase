"use client";

import { useState } from "react";

export default function BookPage() {
  const [service, setService] = useState("");
  const [bookingAt, setBookingAt] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service,
        bookingAt,
        address,
        phone,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Booking created successfully!");
      setService("");
      setBookingAt("");
      setAddress("");
      setPhone("");
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold mb-6">
          Book a Service
        </h1>

        <input
          type="text"
          placeholder="Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="datetime-local"
          value={bookingAt}
          onChange={(e) => setBookingAt(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-3 rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Book Service
        </button>
      </form>
    </div>
  );
}