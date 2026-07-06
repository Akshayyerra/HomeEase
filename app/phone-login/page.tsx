"use client";

import { useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import { signIn } from "next-auth/react";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

export default function PhoneLoginPage() {
  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [showOtp, setShowOtp] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  function setupRecaptcha() {
    if (
      !window.recaptchaVerifier
    ) {
      window.recaptchaVerifier =
        new RecaptchaVerifier(
          firebaseAuth,
          "recaptcha-container",
          {
            size: "normal",
          }
        );
    }
  }

  async function sendOtp() {
    try {
      setLoading(true);

      setupRecaptcha();

      const appVerifier =
        window.recaptchaVerifier;

      const formattedPhone =
        phone.startsWith("+91")
          ? phone
          : `+91${phone}`;

      const confirmationResult =
        await signInWithPhoneNumber(
          firebaseAuth,
          formattedPhone,
          appVerifier
        );

      window.confirmationResult =
        confirmationResult;

      setShowOtp(true);

      alert("OTP Sent!");
    } catch (error: any) {
      console.error(error);

      alert(
        `${error.code}\n${error.message}`
      );
    }

    setLoading(false);
  }

  async function verifyOtp() {
    try {
      setLoading(true);

      const result =
        await window.confirmationResult.confirm(
          otp
        );

      const firebaseUser =
        result.user;

      // Save user to Prisma
      const response =
        await fetch(
          "/api/auth/phone",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              phone:
                firebaseUser.phoneNumber,
              name:
                name ||
                "Customer",
            }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        alert(
          "Failed to create user"
        );
        setLoading(false);
        return;
      }

      // Create NextAuth session
      const login =
        await signIn("phone", {
          phone:
            firebaseUser.phoneNumber,
          redirect: false,
        });

      if (login?.error) {
        alert(
          "Failed to login."
        );
        setLoading(false);
        return;
      }

      window.location.href =
        "/dashboard";
    } catch (error: any) {
      console.error(error);

      alert(
        `${error.code}\n${error.message}`
      );
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          📱 Login with Phone
        </h1>

        {!showOtp ? (
          <>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="mb-5 w-full rounded-xl border p-4"
            />

            <input
              type="text"
              placeholder="7675015833"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              className="mb-5 w-full rounded-xl border p-4"
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 p-4 font-semibold text-white hover:bg-blue-700"
            >
              {loading
                ? "Sending..."
                : "Send OTP"}
            </button>

            <div
              id="recaptcha-container"
              className="mt-5"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                )
              }
              className="mb-5 w-full rounded-xl border p-4"
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full rounded-xl bg-green-600 p-4 font-semibold text-white hover:bg-green-700"
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}