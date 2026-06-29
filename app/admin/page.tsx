import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import UpdateStatusButton from "@/components/UpdateStatusButton";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const admin = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!admin || admin.role !== "ADMIN") {
    redirect("/");
  }

  const bookings = await prisma.booking.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (b) => b.status === "PENDING"
  ).length;

  const confirmedBookings = bookings.filter(
    (b) => b.status === "CONFIRMED"
  ).length;

  const completedBookings = bookings.filter(
    (b) => b.status === "COMPLETED"
  ).length;

  const cancelledBookings = bookings.filter(
    (b) => b.status === "CANCELLED"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">
            Total Bookings
          </h2>
          <p className="text-3xl font-bold mt-2">
            {totalBookings}
          </p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg shadow">
          <h2 className="text-yellow-700">
            Pending
          </h2>
          <p className="text-3xl font-bold text-yellow-700 mt-2">
            {pendingBookings}
          </p>
        </div>

        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-green-700">
            Confirmed
          </h2>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {confirmedBookings}
          </p>
        </div>

        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h2 className="text-blue-700">
            Completed
          </h2>
          <p className="text-3xl font-bold text-blue-700 mt-2">
            {completedBookings}
          </p>
        </div>

        <div className="bg-red-100 p-6 rounded-lg shadow">
          <h2 className="text-red-700">
            Cancelled
          </h2>
          <p className="text-3xl font-bold text-red-700 mt-2">
            {cancelledBookings}
          </p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-6 rounded-lg shadow"
            >
              <h2 className="text-2xl font-bold uppercase">
                {booking.service}
              </h2>

              <p className="mt-3">
                👤 {booking.user.name}
              </p>

              <p className="mt-2">
                📧 {booking.user.email}
              </p>

              <p className="mt-2">
                📅{" "}
                {new Date(
                  booking.bookingAt
                ).toLocaleString()}
              </p>

              <p className="mt-2">
                📍 {booking.address}
              </p>

              <p className="mt-2">
                📞 {booking.phone}
              </p>

              <p className="mt-3">
                Status:
                <span
                  className={`ml-2 font-bold ${
                    booking.status === "PENDING"
                      ? "text-yellow-600"
                      : booking.status === "CONFIRMED"
                      ? "text-green-600"
                      : booking.status === "COMPLETED"
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.status}
                </span>
              </p>

              {/* Action Button */}
              <UpdateStatusButton
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