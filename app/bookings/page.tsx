import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import CancelBookingButton from "@/components/CancelBookingButton";

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

  const bookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-6 rounded-lg shadow"
            >
              <h2 className="text-xl font-semibold">
                {booking.service}
              </h2>

              <p className="mt-2">
                📅 {new Date(booking.bookingAt).toLocaleString()}
              </p>

              <p className="mt-2">
                📍 {booking.address}
              </p>

              <p className="mt-2">
                📞 {booking.phone}
              </p>

              <p className="mt-2">
                Status:
                <span
                  className={`ml-2 font-semibold ${
                    booking.status === "CANCELLED"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {booking.status}
                </span>
              </p>

              <CancelBookingButton
                bookingId={booking.id}
                status={booking.status}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}