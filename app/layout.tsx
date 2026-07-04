import "./globals.css";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  let role = "";

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    role = user?.role || "";
  }

  return (
    <html lang="en">
      <body>
        <Navbar
          role={role}
          isLoggedIn={!!session}
        />

        {children}
      </body>
    </html>
  );
}