"use client";

import { useRouter } from "next/navigation";

export default function UpdateStatusButton({
  bookingId,
  status,
}: {
  bookingId: string;
  status: string;
}) {
  const router = useRouter();

  const normalizedStatus =
    status.toUpperCase();

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
    } else {
      const data = await res.json();
      alert(
        data.error ||
          "Failed to update booking"
      );
    }
  }

  if (normalizedStatus === "PENDING") {
    return (
      <button
        onClick={() =>
          updateStatus("CONFIRMED")
        }
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Confirm Booking
      </button>
    );
  }

  if (
    normalizedStatus === "CONFIRMED"
  ) {
    return (
      <button
        onClick={() =>
          updateStatus("COMPLETED")
        }
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Complete Booking
      </button>
    );
  }

  return null;
}