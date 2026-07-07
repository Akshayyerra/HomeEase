import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: {
      bookingId: string;
    };
  }
) {
  try {
    const {
      paymentId,
    } = await request.json();

    await prisma.booking.update({
      where: {
        id: params.bookingId,
      },
      data: {
        paymentId,
        paymentStatus:
          "PAID",
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}