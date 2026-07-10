import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

export async function GET(
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
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const bookingId = params.bookingId;

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID missing" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        user: true,
        worker: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.user.email !== session.user.email) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    if (
      booking.status !== "COMPLETED" ||
      booking.paymentStatus !== "PAID"
    ) {
      return NextResponse.json(
        {
          error:
            "Invoice available only after payment.",
        },
        { status: 400 }
      );
    }

    // ---------------- PDF ----------------

    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([595, 842]);

    const font = await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

    const bold = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

    let y = 800;

    const write = (
      text: string,
      size = 12,
      isBold = false,
      color = rgb(0, 0, 0)
    ) => {
      page.drawText(text, {
        x: 50,
        y,
        size,
        font: isBold ? bold : font,
        color,
      });

      y -= 24;
    };

    write(
      "HOMEEASE",
      26,
      true,
      rgb(0, 0.5, 0)
    );

    write(
      "Service Invoice",
      18,
      true
    );

    y -= 10;

    write("----------------------------------------");

    write(
      `Invoice No : INV-${booking.id.slice(-6)}`
    );

    write(`Booking ID : ${booking.id}`);

    write(
      `Customer : ${booking.user.name}`
    );

    write(
      `Worker : ${booking.worker?.name ??
      "Not Assigned"
      }`
    );

    write(
      `Service : ${booking.service}`
    );

    write(
      `Booking Date : ${new Date(
        booking.bookingAt
      ).toLocaleString()}`
    );

    write(
      `Address : ${booking.address}`
    );

    write(
      `Phone : ${booking.phone}`
    );

    write(
      `Payment Status : ${booking.paymentStatus}`
    );

    write(
      `Transaction ID : ${booking.paymentId ?? "N/A"
      }`
    );

    y -= 15;

    write("----------------------------------------");

    write(
      "Thank you for choosing HomeEase!",
      16,
      true,
      rgb(0, 0.2, 0.8)
    );

    write(
      "We appreciate your trust."
    );

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes.buffer as ArrayBuffer, {
      headers: {
        "Content-Type":
          "application/pdf",
        "Content-Disposition": `attachment; filename=Invoice-${booking.id}.pdf`,
      },
    });
  } catch (error) {
    console.error(
      "Invoice Error:",
      error
    );

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