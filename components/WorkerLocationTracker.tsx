"use client";

import { useEffect } from "react";

export default function WorkerLocationTracker({
  bookingId,
}: {
  bookingId: string;
}) {
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId =
      navigator.geolocation.watchPosition(
        async (position) => {
          try {
            await fetch(
              `/api/bookings/${bookingId}/worker-location`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  latitude:
                    position.coords.latitude,
                  longitude:
                    position.coords.longitude,
                }),
              }
            );

            console.log(
              "Worker location updated"
            );
          } catch (error) {
            console.log(error);
          }
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );

    return () => {
      navigator.geolocation.clearWatch(
        watchId
      );
    };
  }, [bookingId]);

  return null;
}