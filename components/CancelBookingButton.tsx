"use client";

import { useRouter } from "next/navigation";

export default function CancelBookingButton({
  bookingId,
  status,
}: {
  bookingId: string;
  status: string;
}) {
  const router = useRouter();

  const normalizedStatus =
    status.toUpperCase();

  // Don't show button for completed or cancelled bookings
  if (
    normalizedStatus === "COMPLETED" ||
    normalizedStatus === "CANCELLED"
  ) {
    return null;
  }

  async function cancelBooking() {
    const res = await fetch(
      `/api/bookings/${bookingId}`,
      {
        method: "PATCH",
      }
    );

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to cancel booking");
    }
  }

  return (
    <button
      onClick={cancelBooking}
      className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
      Cancel Booking
    </button>
  );
}