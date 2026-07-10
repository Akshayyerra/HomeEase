"use client";

import { useState } from "react";
import { SERVICE_PRICES } from "@/lib/servicePrices";

const services = [
  { name: "Electrician", icon: "⚡" },
  { name: "Home Cleaner", icon: "🧹" },
  { name: "Plumber", icon: "🚰" },
  { name: "Salon at Home", icon: "💇" },
  { name: "Carpenter", icon: "🪚" },
  { name: "AC Repair", icon: "❄️" },
  { name: "Washing Machine Repair", icon: "🧺" },
  { name: "Appliances Repair", icon: "🔧" },
  { name: "Construction Worker", icon: "🏗️" },
];

export default function BookPage() {
  const [service, setService] = useState("");
  const [bookingAt, setBookingAt] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        alert("Location captured successfully!");
      },
      () => {
        alert("Please allow location access.");
      }
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!service) {
      alert("Please select a service.");
      return;
    }

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
        latitude,
        longitude,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Booking created successfully!");

      setService("");
      setBookingAt("");
      setAddress("");
      setPhone("");
      setLatitude(null);
      setLongitude(null);
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 py-10 px-4">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-10 text-center text-5xl font-bold text-gray-800">
          Book a Service
        </h1>

        {/* Service Selection */}
        <h2 className="mb-5 text-2xl font-semibold">
          Select a Service
        </h2>

        <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setService(item.name)}
              className={`rounded-2xl border-2 p-6 text-left transition-all duration-300 hover:scale-105 ${service === item.name
                  ? "border-green-600 bg-green-100 shadow-xl"
                  : "border-gray-200 bg-white hover:border-green-400 hover:shadow-lg"
                }`}
            >
              <div className="text-5xl">
                {item.icon}
              </div>

              <h3 className="mt-4 text-xl font-bold">
                {item.name}
              </h3>

              <p className="mt-3 text-sm text-gray-500">
                Starting From
              </p>

              <p className="text-3xl font-bold text-green-600">
                ₹{SERVICE_PRICES[item.name]}
              </p>
            </button>
          ))}
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-xl"
        >
          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              Selected Service
            </label>

            <input
              type="text"
              value={service}
              readOnly
              placeholder="Select a service above"
              className="w-full rounded-xl border bg-gray-100 p-4"
            />

            {service && (
              <div className="mt-4 rounded-xl bg-green-50 p-5">
                <p className="text-gray-600">
                  Starting Price
                </p>

                <p className="text-4xl font-bold text-green-600">
                  ₹{SERVICE_PRICES[service]}
                </p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              Booking Date & Time
            </label>

            <input
              type="datetime-local"
              value={bookingAt}
              onChange={(e) =>
                setBookingAt(e.target.value)
              }
              className="w-full rounded-xl border p-4"
              required
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              Address
            </label>

            <textarea
              rows={3}
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="Enter complete address"
              className="w-full rounded-xl border p-4"
              required
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              Phone Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="9876543210"
              className="w-full rounded-xl border p-4"
              required
            />
          </div>

          <button
            type="button"
            onClick={getLocation}
            className="mb-6 w-full rounded-xl bg-blue-600 p-4 font-semibold text-white transition hover:bg-blue-700"
          >
            📍 Use Current Location
          </button>

          {latitude && longitude && (
            <div className="mb-6 rounded-xl bg-green-100 p-4 text-center font-semibold text-green-700">
              ✅ Location Captured Successfully
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-green-600 p-4 text-xl font-bold text-white transition hover:bg-green-700"
          >
            🚀 Book Service
          </button>
        </form>
      </div>
    </div>
  );
}