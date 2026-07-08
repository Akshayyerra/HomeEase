import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { bookingId, rating, comment } =
      await req.json();

    const customer =
      await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

    if (!customer) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const booking =
      await prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
      });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.userId !== customer.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    if (booking.status !== "COMPLETED") {
      return NextResponse.json(
        {
          error:
            "Service not completed yet.",
        },
        { status: 400 }
      );
    }

    const existing =
      await prisma.review.findUnique({
        where: {
          bookingId,
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "Review already submitted.",
        },
        { status: 400 }
      );
    }

    const review =
      await prisma.review.create({
        data: {
          rating,
          comment,
          bookingId,
          customerId: customer.id,
          workerId: booking.workerId!,
        },
      });

    return NextResponse.json({
      success: true,
      review,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}