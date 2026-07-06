import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    // ==========================
    // PHONE LOGIN (CUSTOMERS)
    // ==========================
    Credentials({
      id: "phone",
      name: "phone",
      credentials: {
        phone: {},
      },

      async authorize(credentials) {
        try {
          if (!credentials?.phone) {
            return null;
          }

          const user =
            await prisma.user.findUnique({
              where: {
                phone:
                  credentials.phone as string,
              },
            });

          if (!user) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.log(
            "Phone Login Error:",
            error
          );
          return null;
        }
      },
    }),

    // ==========================
    // EMAIL + PASSWORD LOGIN
    // (ADMIN & PROVIDER)
    // ==========================
    Credentials({
      id: "credentials",
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          if (
            !credentials?.email ||
            !credentials?.password
          ) {
            return null;
          }

          const user =
            await prisma.user.findUnique({
              where: {
                email:
                  credentials.email as string,
              },
            });

          if (!user) {
            return null;
          }

          // OTP users don't have passwords
          if (!user.password) {
            return null;
          }

          const passwordMatch =
            await bcrypt.compare(
              credentials.password as string,
              user.password
            );

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.log(
            "Credentials Error:",
            error
          );

          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({
      token,
      user,
    }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({
      session,
      token,
    }) {
      if (session.user) {
        session.user.id =
          token.id as string;

        session.user.role =
          token.role as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret:
    process.env.AUTH_SECRET,
});