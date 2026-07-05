import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getDistance } from "geolib";

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
    booking.latitude &&
    booking.longitude &&
    booking.workerLatitude &&
    booking.workerLongitude;

  let distanceKm = 0;
  let eta = 0;

  if (hasLocations) {
    const distance =
      getDistance(
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

    eta = Math.max(
      1,
      Math.ceil(distanceKm / 0.5)
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-4xl font-bold">
          📍 Track Worker
        </h1>

        <div className="space-y-4 text-lg">
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

              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${booking.workerLatitude},${booking.workerLongitude}&destination=${booking.latitude},${booking.longitude}&travelmode=driving`}
                target="_blank"
                className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
              >
                🗺 View Route
              </a>
            </>
          ) : (
            <p className="text-red-600">
              Waiting for worker location...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}