import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import AssignWorker from "@/components/AssignWorker";
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

  console.log("Session Email:", session.user.email);
  console.log("Admin User:", admin);

  if (!admin) {
    redirect("/login");
  }

  if (admin.role !== "ADMIN") {
    redirect("/");
  }

  const bookings = await prisma.booking.findMany({
    include: {
      user: true,
      worker: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const workers = await prisma.user.findMany({
    where: {
      role: "PROVIDER",
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Admin Dashboard
      </h1>

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
                  👤 {booking.user.name}
                </p>

                <p>
                  📧 {booking.user.email}
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

                {booking.paymentStatus && (
                  <p>
                    💳 Payment Status:{" "}
                    <span className="font-semibold text-green-600">
                      {booking.paymentStatus}
                    </span>
                  </p>
                )}

                {booking.paymentId && (
                  <p>
                    🧾 Transaction ID:{" "}
                    {booking.paymentId}
                  </p>
                )}
              </div>

              {/* Worker Assignment */}
              <div className="mt-6">
                {booking.worker ? (
                  <p className="font-semibold text-green-600">
                    👷 Assigned to:{" "}
                    {booking.worker.name}
                  </p>
                ) : (
                  <AssignWorker
                    bookingId={booking.id}
                    workers={workers}
                  />
                )}
              </div>

              {/* Status Update */}
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