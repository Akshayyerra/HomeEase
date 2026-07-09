import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import AssignWorker from "@/components/AssignWorker";
import UpdateStatusButton from "@/components/UpdateStatusButton";
import { Prisma } from "@prisma/client";

type BookingWithRelations = Prisma.BookingGetPayload<{
  include: {
    user: true;
    worker: true;
  };
}>;

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

  // All bookings
  const bookings: BookingWithRelations[] =
    await prisma.booking.findMany({
      include: {
        user: true,
        worker: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  // Only online workers
  const workers = await prisma.user.findMany({
    where: {
      role: "PROVIDER",
      isOnline: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  // Dashboard statistics
  const totalWorkers = await prisma.user.count({
    where: {
      role: "PROVIDER",
    },
  });

  const onlineWorkers = await prisma.user.count({
    where: {
      role: "PROVIDER",
      isOnline: true,
    },
  });

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Admin Dashboard
      </h1>

      {/* Dashboard Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">
            📋 Total Bookings
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {totalBookings}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">
            ⏳ Pending
          </p>

          <h2 className="mt-2 text-4xl font-bold text-yellow-600">
            {pendingBookings}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">
            👷 Total Workers
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {totalWorkers}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">
            🟢 Online Workers
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {onlineWorkers}
          </h2>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl bg-white p-8 shadow">
          <p className="text-lg">
            No bookings found.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl bg-white p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold capitalize">
                🔧 {booking.service}
              </h2>

              <div className="mt-5 space-y-2">
                <p>
                  👤{" "}
                  {booking.user?.name ??
                    "No Name"}
                </p>

                <p>
                  📧{" "}
                  {booking.user?.email ??
                    "No Email"}
                </p>

                <p>
                  📅{" "}
                  {new Date(
                    booking.bookingAt
                  ).toLocaleString()}
                </p>

                <p>
                  📍 {booking.address}
                </p>

                <p>
                  📞 {booking.phone}
                </p>

                <p>
                  Status:{" "}
                  <span className="font-semibold">
                    {booking.status}
                  </span>
                </p>

                <p>
                  💳 Payment:{" "}
                  <span className="font-semibold text-green-600">
                    {booking.paymentStatus}
                  </span>
                </p>

                {booking.paymentId && (
                  <p>
                    🧾 Transaction ID:{" "}
                    {booking.paymentId}
                  </p>
                )}
              </div>

              <div className="mt-6">
                {booking.worker ? (
                  <div className="rounded-xl bg-green-50 p-4">
                    <p className="font-semibold text-green-700">
                      👷 Assigned Worker
                    </p>

                    <p className="mt-2 text-xl font-bold">
                      {booking.worker.name}
                    </p>

                    <p className="mt-2">
                      {booking.worker.isOnline ? (
                        <span className="font-semibold text-green-600">
                          🟢 Online
                        </span>
                      ) : (
                        <span className="font-semibold text-red-600">
                          🔴 Offline
                        </span>
                      )}
                    </p>
                  </div>
                ) : (
                  <AssignWorker
                    bookingId={booking.id}
                    workers={workers}
                  />
                )}
              </div>

              <div className="mt-6">
                <UpdateStatusButton
                  bookingId={booking.id}
                  status={booking.status}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}