"use server";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (
        req.nextUrl.pathname.startsWith("/checkout") ||
        req.nextUrl.pathname.startsWith("/coin") ||
        req.nextUrl.pathname.startsWith("/detail") ||
        req.nextUrl.pathname.startsWith("/mentoringku") ||
        req.nextUrl.pathname.startsWith("/success")
      ) {
        return token?.role === "admin" || token?.role === "user";
      } else if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin";
      } else if (req.nextUrl.pathname.startsWith("/mentor")) {
        return token?.role === "admin" || token?.role === "mentor";
      }
      return !!token;
    },
  },
});
export const config = {
  matcher: [
    "/admin/:path*",
    "/mentor/:path*",
    "/checkout/:path*",
    "/coin/:path*",
    "/mentoringku/:path*",
    "/profile/:path*",
    "/success/:path*",
  ],
};
