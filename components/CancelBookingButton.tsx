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

  async function cancelBooking() {
    const confirmCancel = confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    const res = await fetch(
      `/api/bookings/${bookingId}`,
      {
        method: "PATCH",
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Booking cancelled successfully!");
      router.refresh();
    } else {
      alert(data.error);
    }
  }

  if (status === "CANCELLED") {
    return (
      <p className="mt-4 text-red-600 font-semibold">
        This booking is cancelled.
      </p>
    );
  }

  return (
    <button
      onClick={cancelBooking}
      className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Cancel Booking
    </button>
  );
}