import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getDistance } from "geolib";
import dynamic from "next/dynamic";
import AutoRefresh from "@/components/AutoRefresh";

const TrackingMap = dynamic(
  () => import("@/components/TrackingMap"),
  {
    ssr: false,
  }
);

export default async function TrackPage({
  params,
}: {
  params: {
    bookingId: string;
  };
}) {
  const booking =
    await prisma.booking.findUnique({
      where: {
        id: params.bookingId,
      },
      include: {
        worker: true,
      },
    });

  if (!booking) {
    notFound();
  }

  const hasLocations =
    booking.latitude !== null &&
    booking.longitude !== null &&
    booking.workerLatitude !== null &&
    booking.workerLongitude !== null;

  let distanceKm = 0;
  let eta = 0;

  if (hasLocations) {
    const distance = getDistance(
      {
        latitude: booking.latitude!,
        longitude: booking.longitude!,
      },
      {
        latitude:
          booking.workerLatitude!,
        longitude:
          booking.workerLongitude!,
      }
    );

    distanceKm = Number(
      (distance / 1000).toFixed(2)
    );

    // Approximate city travel speed
    eta = Math.max(
      1,
      Math.ceil(distanceKm / 0.5)
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <AutoRefresh />

      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-3 text-4xl font-bold">
          📍 Track Worker
        </h1>

        <p className="mb-8 text-gray-500">
          🔄 Location updates automatically every
          5 seconds.
        </p>

        <div className="space-y-5 text-lg">
          <p>
            👷 Worker:
            <span className="ml-2 font-semibold">
              {booking.worker?.name ??
                "Not Assigned"}
            </span>
          </p>

          <p>
            🔧 Service:
            <span className="ml-2 font-semibold">
              {booking.service}
            </span>
          </p>

          <p>
            📍 Address:
            <span className="ml-2 font-semibold">
              {booking.address}
            </span>
          </p>

          <p>
            📋 Status:
            <span className="ml-2 font-semibold text-blue-600">
              {booking.status}
            </span>
          </p>

          {hasLocations ? (
            <>
              <p>
                🚗 Distance:
                <span className="ml-2 font-semibold">
                  {distanceKm} km
                </span>
              </p>

              <p>
                ⏱ ETA:
                <span className="ml-2 font-semibold">
                  {eta} mins
                </span>
              </p>

              <div className="mt-6">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${booking.workerLatitude},${booking.workerLongitude}&destination=${booking.latitude},${booking.longitude}&travelmode=driving`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  🗺 View Route
                </a>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl">
                <TrackingMap
                  customerLat={
                    booking.latitude!
                  }
                  customerLng={
                    booking.longitude!
                  }
                  workerLat={
                    booking.workerLatitude!
                  }
                  workerLng={
                    booking.workerLongitude!
                  }
                />
              </div>
            </>
          ) : (
            <div className="rounded-2xl bg-yellow-100 p-6 text-yellow-800">
              Waiting for worker location...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}