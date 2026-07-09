"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkerAvailabilityToggle({
  initialStatus,
}: {
  initialStatus: boolean;
}) {
  const [isOnline, setIsOnline] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggleStatus() {
    try {
      setLoading(true);

      const res = await fetch("/api/worker/availability", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isOnline: !isOnline,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        setLoading(false);
        return;
      }

      setIsOnline(!isOnline);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update availability.");
    }

    setLoading(false);
  }

  return (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">
        Worker Availability
      </h2>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">
            Status
          </p>

          <p
            className={`mt-2 text-xl font-bold ${
              isOnline
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {isOnline
              ? "🟢 Online"
              : "🔴 Offline"}
          </p>
        </div>

        <button
          onClick={toggleStatus}
          disabled={loading}
          className={`rounded-xl px-6 py-3 font-semibold text-white ${
            isOnline
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading
            ? "Updating..."
            : isOnline
            ? "Go Offline"
            : "Go Online"}
        </button>
      </div>
    </div>
  );
}