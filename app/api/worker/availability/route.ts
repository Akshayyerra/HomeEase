import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { isOnline } = await req.json();

    const worker = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!worker) {
      return NextResponse.json(
        { error: "Worker not found" },
        { status: 404 }
      );
    }

    if (worker.role !== "PROVIDER") {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    await prisma.user.update({
      where: {
        id: worker.id,
      },
      data: {
        isOnline,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}