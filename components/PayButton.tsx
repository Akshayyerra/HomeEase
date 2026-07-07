"use client";

import { getServicePrice } from "@/lib/servicePrices";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PayButton({
  bookingId,
  service,
}: {
  bookingId: string;
  service: string;
}) {
  async function handlePayment() {
    try {
      const amount =
        getServicePrice(service);

      const res = await fetch(
        "/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            amount,
          }),
        }
      );

      const order =
        await res.json();

      const options = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,
        currency:
          order.currency,

        name: "HomeEase",

        description: `${service} Service`,

        order_id: order.id,

        handler:
          async function (
            response: any
          ) {
            await fetch(
              `/api/bookings/${bookingId}/payment`,
              {
                method:
                  "PATCH",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  paymentId:
                    response.razorpay_payment_id,
                }),
              }
            );

            alert(
              "Payment Successful"
            );

            window.location.reload();
          },

        theme: {
          color: "#16a34a",
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();
    } catch (error) {
      console.log(error);

      alert(
        "Payment failed."
      );
    }
  }

  return (
    <button
      onClick={handlePayment}
      className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
    >
      💳 Pay ₹
      {getServicePrice(service)}
    </button>
  );
}