import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { workerId } = await req.json();

    const booking = await prisma.booking.update({
      where: {
        id: params.id,
      },
      data: {
        workerId,
        status: "CONFIRMED",
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}