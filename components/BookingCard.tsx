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
          📅 <DateTime date={booking.bookingAt} />
        </p>

        <p>📍 {booking.address}</p>

        <p>📞 {booking.phone}</p>

        {/* NEW PRICE SECTION */}
        <div className="rounded-2xl bg-green-50 p-5">
          <p className="text-gray-500">
            Service Price
          </p>

          <p className="mt-2 text-4xl font-bold text-green-600">
            ₹{booking.price}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mt-8 flex items-center gap-3">
        <span className="text-lg font-semibold">
          Status:
        </span>

        <StatusBadge status={booking.status} />
      </div>

      {/* Payment */}
      {/* Payment Options */}
      {booking.paymentStatus !== "PAID" &&
        booking.status !== "CANCELLED" && (
          <div className="mt-6 space-y-4">
            {/* Online Payment */}
            <PayButton
              bookingId={booking.id}
              service={booking.service}
            />

            {/* Cash on Delivery */}
            <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4">
              <h3 className="font-bold text-yellow-800">
                💵 Cash on Delivery
              </h3>

              <p className="mt-2 text-sm text-yellow-700">
                Prefer paying by cash?
                Simply pay the worker after the service is completed.
                Once the worker receives the cash, they will mark the
                payment as received and your invoice will be generated.
              </p>
            </div>
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
        {new Date(booking.createdAt).toLocaleDateString()}
      </div>

      {/* Download Invoice */}
      {booking.status === "COMPLETED" &&
        booking.paymentStatus === "PAID" && (
          <div className="mt-6">
            <a
              href={`/api/invoice/${booking.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              📄 Download Invoice
            </a>
          </div>
        )}

      {/* Review */}
      {booking.status === "COMPLETED" && (
        <>
          {booking.review ? (
            <div className="mt-6 rounded-2xl bg-green-50 p-5">
              <h3 className="font-bold text-green-700">
                ⭐ Your Review
              </h3>

              <div className="mt-2 text-2xl">
                {"⭐".repeat(booking.review.rating)}
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