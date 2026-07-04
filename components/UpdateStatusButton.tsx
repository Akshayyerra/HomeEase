"use client";

import { useRouter } from "next/navigation";

interface Props {
  bookingId: string;
  status: string;
  label?: string;
}

export default function UpdateStatusButton({
  bookingId,
  status,
  label,
}: Props) {
  const router = useRouter();

  async function updateStatus(
    newStatus: string
  ) {
    const res = await fetch(
      `/api/admin/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    if (res.ok) {
      router.refresh();
    }
  }

  if (status === "PENDING") {
    return (
      <button
        onClick={() =>
          updateStatus("CONFIRMED")
        }
        className="rounded bg-green-600 px-4 py-2 text-white"
      >
        {label || "Confirm Booking"}
      </button>
    );
  }

  if (status === "CONFIRMED") {
    return (
      <button
        onClick={() =>
          updateStatus("IN_PROGRESS")
        }
        className="rounded bg-yellow-500 px-4 py-2 text-white"
      >
        {label || "Accept Job"}
      </button>
    );
  }

  if (status === "IN_PROGRESS") {
    return (
      <button
        onClick={() =>
          updateStatus("COMPLETED")
        }
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {label || "Complete Service"}
      </button>
    );
  }

  return null;
}