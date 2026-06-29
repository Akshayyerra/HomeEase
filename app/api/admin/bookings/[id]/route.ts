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

    const admin = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    const { status } = await req.json();

    const booking = await prisma.booking.update({
      where: {
        id: params.id,
      },
      data: {
        status,
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