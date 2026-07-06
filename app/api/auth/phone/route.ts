import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request
) {
  try {
    const { phone, name } =
      await request.json();

    let user =
      await prisma.user.findUnique({
        where: {
          phone,
        },
      });

    if (!user) {
      user =
        await prisma.user.create({
          data: {
            name,
            phone,
            role: "CUSTOMER",
          },
        });
    }

    return NextResponse.json({
      success: true,
      user,
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