import StatusBadge from "@/components/StatusBadge";
import CancelBookingButton from "@/components/CancelBookingButton";
import PayButton from "@/components/PayButton";
import ReviewForm from "@/components/ReviewForm";
import DateTime from "@/components/DateTime";
import { Prisma } from "@prisma/client";

type BookingWithReview = Prisma.BookingGetPayload<{
  include: {
    review: true;
  };
}>;

export default function BookingCard({
  booking,
}: {
  booking: BookingWithReview;
}) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold capitalize">
          🔧 {booking.service}
        </h2>

        <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
          #{booking.id.slice(-6)}
        </span>
      </div>

      {/* Booking Details */}
      <div className="mt-8 space-y-4 text-lg">
        <p>
          <DateTime date={booking.bookingAt} />
        </p>

        <p>📍 {booking.address}</p>

        <p>📞 {booking.phone}</p>
      </div>

      {/* Status */}
      <div className="mt-8 flex items-center gap-3">
        <span className="text-lg font-semibold">
          Status:
        </span>

        <StatusBadge status={booking.status} />
      </div>

      {/* Payment */}
      {booking.paymentStatus === "PAID" ? (
        <div className="mt-5 flex items-center gap-3">
          <span className="text-lg font-semibold">
            💳 Payment:
          </span>

          <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-700">
            ✔ Paid
          </span>
        </div>
      ) : (
        <div className="mt-5 flex items-center gap-3">
          <span className="text-lg font-semibold">
            💳 Payment:
          </span>

          <span className="rounded-full bg-yellow-100 px-4 py-2 font-bold text-yellow-700">
            Pending
          </span>
        </div>
      )}

      {/* Transaction ID */}
      {booking.paymentId && (
        <div className="mt-6 rounded-2xl bg-gray-50 p-5">
          <p className="text-sm text-gray-500">
            Transaction ID
          </p>

          <p className="mt-2 break-all font-medium text-gray-800">
            {booking.paymentId}
          </p>
        </div>
      )}

      {/* Pay Button */}
      {booking.status === "CONFIRMED" &&
        booking.paymentStatus !== "PAID" && (
          <div className="mt-6">
            <PayButton
              bookingId={booking.id}
              service={booking.service}
            />
          </div>
        )}

      {/* Worker Live Location */}
      {booking.status === "IN_PROGRESS" &&
        booking.workerLatitude &&
        booking.workerLongitude && (
          <div className="mt-6 rounded-2xl bg-blue-50 p-5">
            <h3 className="text-xl font-bold text-blue-700">
              🚗 Worker Live Location
            </h3>

            <p className="mt-3 text-gray-700">
              Your worker is on the way.
            </p>

            <a
              href={`https://www.google.com/maps?q=${booking.workerLatitude},${booking.workerLongitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              📍 Track Worker
            </a>
          </div>
        )}

      {/* Booking Created */}
      <div className="mt-5 text-sm text-gray-500">
        Booking created on{" "}
        {new Date(
          booking.createdAt
        ).toLocaleDateString()}
      </div>

      {/* Review */}
      {booking.status === "COMPLETED" && (
        <>
          {booking.review ? (
            <div className="mt-6 rounded-2xl bg-green-50 p-5">
              <h3 className="font-bold text-green-700">
                ⭐ Your Review
              </h3>

              <div className="mt-2 text-2xl">
                {"⭐".repeat(
                  booking.review.rating
                )}
              </div>

              {booking.review.comment && (
                <p className="mt-3 italic text-gray-700">
                  "{booking.review.comment}"
                </p>
              )}
            </div>
          ) : (
            <ReviewForm bookingId={booking.id} />
          )}
        </>
      )}

      {/* Cancel */}
      {booking.status !== "COMPLETED" &&
        booking.status !== "CANCELLED" && (
          <div className="mt-8">
            <CancelBookingButton
              bookingId={booking.id}
              status={booking.status}
            />
          </div>
        )}
    </div>
  );
}