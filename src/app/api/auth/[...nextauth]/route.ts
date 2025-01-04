import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prismaClient = new PrismaClient()

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email) {
          console.error("User email is undefined in signIn callback.");
          return false;
        }

        const existingUser = await prismaClient.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prismaClient.user.create({
            data: {
              email: user.email,
              name: user.name || "Unknown", 
              provider: "Google",
            },
          });
        }
        return true;
      } catch (e) {
        console.error("Error in signIn callback:", e);
        return false;
      }
    },
    async session({ session, token }) {
      try {
        if (!session.user.email) {
          console.error("Session user email is missing.");
          return session;
        }
        const dbUser = await prismaClient.user.findUnique({
          where: { email: session.user.email },
        });
        if (dbUser) {
          session.user.id = dbUser.id; 
        }
      } catch (e) {
        console.error("Error in session callback:", e);
      }
      return session;
    },
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
        } else if (token.email) {
          const dbUser = await prismaClient.user.findUnique({
            where: { email: token.email },
          });
          if (dbUser) {
            token.id = dbUser.id;
          }
        }
      } catch (e) {
        console.error("Error in JWT callback:", e);
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
