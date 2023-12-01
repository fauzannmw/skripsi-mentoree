import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return (
          //@ts-ignore
          profile?.email_verified &&
          //@ts-ignore
          profile?.email?.endsWith("@student.ub.ac.id")
        );
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
