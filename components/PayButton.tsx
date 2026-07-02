"use client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PayButton() {
  async function handlePayment() {
    try {
      const res = await fetch(
        "/api/create-order",
        {
          method: "POST",
        }
      );

      const order = await res.json();

      const options = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "HomeEase",
        description:
          "Home Service Booking",
        order_id: order.id,

        handler: function (
          response: any
        ) {
          alert(
            `Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`
          );
        },

        theme: {
          color: "#16a34a",
        },
      };

      const paymentObject =
        new window.Razorpay(
          options
        );

      paymentObject.open();
    } catch (error) {
      console.log(error);
      alert(
        "Payment failed to start."
      );
    }
  }

  return (
    <button
      onClick={handlePayment}
      className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
    >
      Pay ₹499
    </button>
  );
}