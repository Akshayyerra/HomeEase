import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const worker = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!worker || worker.role !== "PROVIDER") {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Ensure this booking belongs to this worker
    if (booking.workerId !== worker.id) {
      return NextResponse.json(
        { error: "This booking is not assigned to you." },
        { status: 403 }
      );
    }

    const { status } = await req.json();

    const updatedBooking = await prisma.booking.update({
      where: {
        id: params.id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(updatedBooking);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}