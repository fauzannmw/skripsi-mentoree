import prisma from "@/server/database";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const date = new Date().toISOString().slice(0, 10);

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          emailVerified: Date.now(),
          image: profile.picture,
          role:
            profile?.email === "lutfifanani@ub.ac.id" ||
            profile?.email === "adam@ub.ac.id" ||
            profile?.email === "mentoree.ub@gmail.com"
              ? "admin"
              : "user",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return (
          //@ts-ignore
          profile?.email_verified
          // &&
          // //@ts-ignore
          // profile?.email?.endsWith("ub.ac.id")
          //   ||
          // profile?.email == "fauzanwahyudi0@gmail.com" ||
          // profile?.email == "mentoree.ub@gmail.com"
        );
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    //@ts-ignore
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
