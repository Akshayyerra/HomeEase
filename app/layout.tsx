import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}