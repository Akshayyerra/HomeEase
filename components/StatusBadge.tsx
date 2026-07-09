"use client";

import { useRouter } from "next/navigation";

interface Props {
  bookingId: string;
  status: string;
  label?: string;

  // NEW
  isWorker?: boolean;
}

export default function UpdateStatusButton({
  bookingId,
  status,
  label,
  isWorker = false,
}: Props) {
  const router = useRouter();

  async function updateStatus(newStatus: string) {
    const url = isWorker
      ? `/api/worker/bookings/${bookingId}`
      : `/api/admin/bookings/${bookingId}`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to update status.");
      return;
    }

    router.refresh();
  }

  if (status === "PENDING") {
    return (
      <button
        onClick={() => updateStatus("CONFIRMED")}
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        {label || "Confirm Booking"}
      </button>
    );
  }

  if (status === "CONFIRMED") {
    return (
      <button
        onClick={() => updateStatus("IN_PROGRESS")}
        className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
      >
        {label || "Accept Job"}
      </button>
    );
  }

  if (status === "IN_PROGRESS") {
    return (
      <button
        onClick={() => updateStatus("COMPLETED")}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        {label || "Complete Service"}
      </button>
    );
  }

  return null;
}