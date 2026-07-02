import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "HomeEase – Home Services at Your Doorstep",
  description:
    "Book trusted professionals for home cleaning, plumbing, electrician, beauty & salon, and AC repair. Same-day booking available.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        {children}
      </body>
    </html>
  );
}