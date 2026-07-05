import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { latitude, longitude } =
      await req.json();

    const booking =
      await prisma.booking.update({
        where: {
          id: params.id,
        },
        data: {
          workerLatitude:
            latitude,
          workerLongitude:
            longitude,
        },
      });

    return NextResponse.json(
      booking
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to update location",
      },
      {
        status: 500,
      }
    );
  }
}