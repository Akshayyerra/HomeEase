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

export default function RegisterPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  function setupRecaptcha() {
    if (!window.recaptchaVerifier) {
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

      const confirmation =
        await signInWithPhoneNumber(
          firebaseAuth,
          formattedPhone,
          appVerifier
        );

      window.confirmationResult =
        confirmation;

      setStep(2);

      alert("OTP Sent");
    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  }

  async function verifyOtp() {
    try {
      setLoading(true);

      await window.confirmationResult.confirm(
        otp
      );

      setStep(3);
    } catch (err: any) {
      alert("Invalid OTP");
    }

    setLoading(false);
  }

  async function createAccount() {
    try {
      setLoading(true);

      const formattedPhone =
        phone.startsWith("+91")
          ? phone
          : `+91${phone}`;

      const res = await fetch(
        "/api/register-phone",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            phone: formattedPhone,
            name,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.error);
        setLoading(false);
        return;
      }

      const login =
        await signIn("phone", {
          phone: formattedPhone,
          redirect: false,
        });

      if (login?.error) {
        alert("Login failed");
        setLoading(false);
        return;
      }

      window.location.href =
        "/dashboard";
    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="mb-8 text-center text-3xl font-bold">
          Register
        </h1>

        {step === 1 && (
          <>
            <input
              className="mb-5 w-full rounded-xl border p-4"
              placeholder="7675015833"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full rounded-xl bg-green-600 p-4 text-white"
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
        )}

        {step === 2 && (
          <>
            <input
              className="mb-5 w-full rounded-xl border p-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 p-4 text-white"
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              className="mb-5 w-full rounded-xl border p-4"
              placeholder="Enter Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <button
              onClick={createAccount}
              disabled={loading}
              className="w-full rounded-xl bg-green-600 p-4 text-white"
            >
              {loading
                ? "Creating..."
                : "Create Account"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}