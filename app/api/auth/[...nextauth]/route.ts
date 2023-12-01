import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    //@ts-ignore
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return (
          profile.email_verified && profile.email.endsWith("@student.ub.ac.id")
        );
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
//@ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
