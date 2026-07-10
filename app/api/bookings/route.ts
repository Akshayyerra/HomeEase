import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getServicePrice } from "@/lib/servicePrices";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Please login first",
        },
        {
          status: 401,
        }
      );
    }

    const {
      service,
      bookingAt,
      address,
      phone,
      latitude,
      longitude,
      paymentId,
      paymentStatus,
    } = await req.json();

    if (
      !service ||
      !bookingAt ||
      !address ||
      !phone
    ) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // ✅ Calculate price from the selected service
    const price = getServicePrice(service);

    const booking = await prisma.booking.create({
      data: {
        service,
        price, // <-- NEW

        bookingAt: new Date(bookingAt),

        address,
        phone,

        latitude: latitude ?? null,
        longitude: longitude ?? null,

        paymentId: paymentId ?? null,
        paymentStatus: paymentStatus ?? "PENDING",

        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}