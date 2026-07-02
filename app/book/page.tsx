"use client";

import { useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BookPage() {
  const [service, setService] =
    useState("");
  const [bookingAt, setBookingAt] =
    useState("");
  const [address, setAddress] =
    useState("");
  const [phone, setPhone] =
    useState("");

  async function handlePayment(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !service ||
      !bookingAt ||
      !address ||
      !phone
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const orderRes = await fetch(
        "/api/create-order",
        {
          method: "POST",
        }
      );

      const order =
        await orderRes.json();

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

        handler: async function (
          response: any
        ) {
          const res =
            await fetch(
              "/api/bookings",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify(
                  {
                    service,
                    bookingAt,
                    address,
                    phone,
                    paymentId:
                      response.razorpay_payment_id,
                    paymentStatus:
                      "PAID",
                  }
                ),
              }
            );

          const data =
            await res.json();

          if (res.ok) {
            alert(
              "Booking created successfully!"
            );

            window.location.href =
              "/bookings";
          } else {
            alert(data.error);
          }
        },

        prefill: {
          name: "Customer",
          contact: phone,
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
        "Failed to start payment."
      );
    }
  }

  async function demoPayment() {
    const res = await fetch(
      "/api/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          service,
          bookingAt,
          address,
          phone,
          paymentId:
            "demo_payment_123",
          paymentStatus: "PAID",
        }),
      }
    );

    const data =
      await res.json();

    if (res.ok) {
      alert(
        "Demo Payment Successful!"
      );

      window.location.href =
        "/bookings";
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handlePayment}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6">
          Book a Service
        </h1>

        <input
          type="text"
          placeholder="Service"
          value={service}
          onChange={(e) =>
            setService(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="datetime-local"
          value={bookingAt}
          onChange={(e) =>
            setBookingAt(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          Pay ₹499 & Book Service
        </button>

        <button
          type="button"
          onClick={demoPayment}
          className="mt-3 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Demo Payment Success
        </button>
      </form>
    </div>
  );
}