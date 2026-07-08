"use client";

import { useState } from "react";

export default function ReviewForm({
  bookingId,
}: {
  bookingId: string;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submitReview() {
    try {
      setLoading(true);

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        setLoading(false);
        return;
      }

      alert("⭐ Review submitted successfully!");

      setSubmitted(true);
    } catch (error) {
      console.error(error);

      alert("Failed to submit review.");
    }

    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="mt-6 rounded-xl bg-green-100 p-4 text-center font-semibold text-green-700">
        ⭐ Thank you for your feedback!
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
      <h3 className="mb-4 text-xl font-bold">
        ⭐ Rate this Service
      </h3>

      <div className="mb-4">
        <label className="mb-2 block font-medium">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          className="w-full rounded-lg border p-3"
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-2 block font-medium">
          Comment
        </label>

        <textarea
          rows={4}
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          placeholder="Share your experience..."
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        onClick={submitReview}
        disabled={loading}
        className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading
          ? "Submitting..."
          : "Submit Review"}
      </button>
    </div>
  );
}