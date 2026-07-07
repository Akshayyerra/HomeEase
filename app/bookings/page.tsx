import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import StatusBadge from "@/components/StatusBadge";
import CancelBookingButton from "@/components/CancelBookingButton";
import PayButton from "@/components/PayButton";
import { Booking } from "@prisma/client";

export default async function BookingsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const bookings: Booking[] = await prisma.booking.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const paidBookings = bookings.filter(
    (booking: Booking) => booking.paymentStatus === "PAID"
  ).length;

  const completedBookings = bookings.filter(
    (booking: Booking) => booking.status === "COMPLETED"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-5xl font-bold text-gray-900">
          My Bookings
        </h1>

        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow">
            <p className="text-gray-500">📋 Total Bookings</p>

            <h2 className="mt-2 text-5xl font-bold">
              {bookings.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow">
            <p className="text-gray-500">💳 Paid Bookings</p>

            <h2 className="mt-2 text-5xl font-bold text-green-600">
              {paidBookings}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow">
            <p className="text-gray-500">
              ✅ Completed Services
            </p>

            <h2 className="mt-2 text-5xl font-bold text-blue-600">
              {completedBookings}
            </h2>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-semibold">
              No bookings found.
            </h2>

            <p className="mt-2 text-gray-500">
              Book your first service to get started.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-8">
            {bookings.map((booking: Booking) => (
              <div
                key={booking.id}
                className="rounded-3xl bg-white p-8 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-bold capitalize">
                    🔧 {booking.service}
                  </h2>

                  <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
                    #{booking.id.slice(-6)}
                  </span>
                </div>

                <div className="mt-8 space-y-4 text-lg">
                  <p>
                    📅{" "}
                    {new Date(
                      booking.bookingAt
                    ).toLocaleString()}
                  </p>

                  <p>📍 {booking.address}</p>

                  <p>📞 {booking.phone}</p>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <span className="font-semibold text-lg">
                    Status:
                  </span>

                  <StatusBadge
                    status={booking.status}
                  />
                </div>

                {booking.paymentStatus === "PAID" ? (
                  <div className="mt-5 flex items-center gap-3">
                    <span className="font-semibold text-lg">
                      💳 Payment:
                    </span>

                    <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-700">
                      ✔ Paid
                    </span>
                  </div>
                ) : (
                  <div className="mt-5 flex items-center gap-3">
                    <span className="font-semibold text-lg">
                      💳 Payment:
                    </span>

                    <span className="rounded-full bg-yellow-100 px-4 py-2 font-bold text-yellow-700">
                      Pending
                    </span>
                  </div>
                )}

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

                {booking.status === "CONFIRMED" &&
                  booking.paymentStatus !== "PAID" && (
                    <div className="mt-6">
                      <PayButton
                        bookingId={booking.id}
                        service={booking.service}
                      />
                    </div>
                  )}

                <div className="mt-5 text-sm text-gray-500">
                  Booking created on{" "}
                  {new Date(
                    booking.createdAt
                  ).toLocaleDateString()}
                </div>

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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}