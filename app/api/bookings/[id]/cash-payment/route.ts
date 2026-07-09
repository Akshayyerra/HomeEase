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

    // Verify worker
    const worker = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!worker || worker.role !== "PROVIDER") {
      return NextResponse.json(
        { error: "Only workers can confirm cash payment." },
        { status: 403 }
      );
    }

    // Find booking
    const booking = await prisma.booking.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found." },
        { status: 404 }
      );
    }

    // Ensure this booking belongs to the logged-in worker
    if (booking.workerId !== worker.id) {
      return NextResponse.json(
        { error: "This booking is not assigned to you." },
        { status: 403 }
      );
    }

    // Only completed bookings can receive cash
    if (booking.status !== "COMPLETED") {
      return NextResponse.json(
        {
          error: "Complete the service before collecting payment.",
        },
        { status: 400 }
      );
    }

    // Prevent duplicate payment
    if (booking.paymentStatus === "PAID") {
      return NextResponse.json(
        {
          error: "Payment already received.",
        },
        { status: 400 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: params.id,
      },
      data: {
        paymentStatus: "PAID",
        paymentId: `COD-${Date.now()}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Cash payment received successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);

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