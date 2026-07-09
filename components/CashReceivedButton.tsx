"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CashReceivedButton({
  bookingId,
}: {
  bookingId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function receiveCash() {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/bookings/${bookingId}/cash-payment`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        setLoading(false);
        return;
      }

      alert("✅ Cash payment received.");

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <button
      onClick={receiveCash}
      disabled={loading}
      className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:bg-gray-400"
    >
      {loading
        ? "Updating..."
        : "💵 Cash Received"}
    </button>
  );
}