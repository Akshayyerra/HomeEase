"use client";

import { useState } from "react";

export default function BookPage() {
  const [service, setService] = useState("");
  const [bookingAt, setBookingAt] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [latitude, setLatitude] =
    useState<number | null>(null);

  const [longitude, setLongitude] =
    useState<number | null>(null);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(
          position.coords.latitude
        );

        setLongitude(
          position.coords.longitude
        );

        alert(
          "Location captured successfully!"
        );
      },
      () => {
        alert(
          "Please allow location access."
        );
      }
    );
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      "/api/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          service,
          bookingAt,
          address,
          phone,
          latitude,
          longitude,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert(
        "Booking created successfully!"
      );

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-3xl font-bold">
          Book a Service
        </h1>

        <input
          type="text"
          placeholder="Service"
          value={service}
          onChange={(e) =>
            setService(e.target.value)
          }
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="datetime-local"
          value={bookingAt}
          onChange={(e) =>
            setBookingAt(
              e.target.value
            )
          }
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          className="mb-4 w-full rounded border p-3"
        />

        <button
          type="button"
          onClick={getLocation}
          className="mb-4 w-full rounded bg-blue-600 p-3 text-white"
        >
          📍 Use Current Location
        </button>

        {latitude &&
          longitude && (
            <p className="mb-4 text-sm text-green-600">
              Location captured ✅
            </p>
          )}

        <button
          type="submit"
          className="w-full rounded bg-green-600 p-3 text-white"
        >
          Book Service
        </button>
      </form>
    </div>
  );
}