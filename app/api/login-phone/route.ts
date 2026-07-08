import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number is required",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "No account found. Please register first.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN PHONE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}