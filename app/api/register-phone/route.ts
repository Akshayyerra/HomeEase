import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { phone, name } = await request.json();

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number is required",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number already registered",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        role: "CUSTOMER",
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Registration failed",
      },
      {
        status: 500,
      }
    );
  }
}