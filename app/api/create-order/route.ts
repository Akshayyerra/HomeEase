import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import razorpay from "@/lib/razorpay";


export async function POST(req: Request) {
  try {

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json(
        {
          error: "Booking ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          error: "Booking not found",
        },
        {
          status: 404,
        }
      );
    }

    const order = await razorpay.orders.create({
      amount: booking.price * 100, // ₹ → paise
      currency: "INR",
      receipt: `booking_${booking.id}`,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create order",
      },
      {
        status: 500,
      }
    );
  }
}