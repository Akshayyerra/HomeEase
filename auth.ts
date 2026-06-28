import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
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
          console.log("Credentials:", credentials);

          if (!credentials?.email || !credentials?.password) {
            console.log("Missing email or password");
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });

          console.log("User found:", user);

          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          console.log("Password Match:", passwordMatch);

          if (!passwordMatch) {
            console.log("Wrong password");
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.log("Authorize Error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.AUTH_SECRET,
});