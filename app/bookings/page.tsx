import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import BookingCard from "@/components/BookingCard";
import { Prisma } from "@prisma/client";

type BookingWithReview = Prisma.BookingGetPayload<{
  include: {
    review: true;
  };
}>;

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

  const bookings: BookingWithReview[] =
    await prisma.booking.findMany({
      where: {
        userId: user.id,
      },
      include: {
        review: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  const totalBookings = bookings.length;

  const paidBookings = bookings.filter(
    (booking) =>
      booking.paymentStatus === "PAID"
  ).length;

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "COMPLETED"
    ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-5xl font-bold text-gray-900">
          My Bookings
        </h1>

        {/* Stats */}
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow">
            <p className="text-gray-500">
              📋 Total Bookings
            </p>

            <h2 className="mt-2 text-5xl font-bold">
              {totalBookings}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow">
            <p className="text-gray-500">
              💳 Paid Bookings
            </p>

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
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}