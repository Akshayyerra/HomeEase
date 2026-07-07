import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import UpdateStatusButton from "@/components/UpdateStatusButton";
import WorkerLocationTracker from "@/components/WorkerLocationTracker";
import { Prisma } from "@prisma/client";

type BookingWithUser = Prisma.BookingGetPayload<{
  include: {
    user: true;
  };
}>;

export default async function WorkerPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const worker = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!worker || worker.role !== "PROVIDER") {
    redirect("/");
  }

  const bookings = await prisma.booking.findMany({
    where: {
      workerId: worker.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Worker Dashboard
      </h1>

      {bookings.length === 0 ? (
        <div className="rounded-xl bg-white p-8 shadow">
          <h2 className="text-2xl font-semibold">
            No assigned jobs.
          </h2>
        </div>
      ) : (
        <div className="space-y-8">
          {bookings.map(
            (booking: BookingWithUser) => (
              <div
                key={booking.id}
                className="rounded-2xl bg-white p-8 shadow"
              >
                {booking.status !==
                  "COMPLETED" && (
                  <WorkerLocationTracker
                    bookingId={booking.id}
                  />
                )}

                <h2 className="text-3xl font-bold capitalize">
                  🔧 {booking.service}
                </h2>

                <div className="mt-6 space-y-3 text-lg">
                  <p>👤 {booking.user.name}</p>

                  <p>📧 {booking.user.email}</p>

                  <p>📞 {booking.phone}</p>

                  <p>📍 {booking.address}</p>

                  <p>
                    📅{" "}
                    {new Date(
                      booking.bookingAt
                    ).toLocaleString()}
                  </p>

                  <p>
                    Status:{" "}
                    <span className="font-bold text-blue-600">
                      {booking.status}
                    </span>
                  </p>

                  {booking.paymentStatus && (
                    <p>
                      💳 Payment:{" "}
                      <span className="font-bold text-green-600">
                        {booking.paymentStatus}
                      </span>
                    </p>
                  )}

                  {booking.paymentId && (
                    <p>
                      🧾 Payment ID:{" "}
                      {booking.paymentId}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`tel:${booking.phone}`}
                    className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                  >
                    📞 Call Customer
                  </a>

                  <a
                    href={`https://wa.me/91${booking.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-green-500 px-5 py-3 text-white hover:bg-green-600"
                  >
                    💬 WhatsApp
                  </a>

                  {booking.latitude &&
                  booking.longitude ? (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${booking.latitude},${booking.longitude}&travelmode=driving`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                    >
                      🗺 Navigate
                    </a>
                  ) : (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        booking.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                    >
                      🗺 Navigate
                    </a>
                  )}
                </div>

                <div className="mt-6">
                  {booking.status ===
                    "CONFIRMED" && (
                    <UpdateStatusButton
                      bookingId={booking.id}
                      status="CONFIRMED"
                      label="👍 Accept Job"
                    />
                  )}

                  {booking.status ===
                    "IN_PROGRESS" && (
                    <UpdateStatusButton
                      bookingId={booking.id}
                      status="IN_PROGRESS"
                      label="✅ Complete Service"
                    />
                  )}
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    Customer Latitude:{" "}
                    {booking.latitude ??
                      "N/A"}
                  </p>

                  <p>
                    Customer Longitude:{" "}
                    {booking.longitude ??
                      "N/A"}
                  </p>

                  <p>
                    Worker Latitude:{" "}
                    {booking.workerLatitude ??
                      "N/A"}
                  </p>

                  <p>
                    Worker Longitude:{" "}
                    {booking.workerLongitude ??
                      "N/A"}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}