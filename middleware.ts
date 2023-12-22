"use server";

import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin";
      } else if (req.nextUrl.pathname.startsWith("/mentor")) {
        return token?.role === "admin" || token?.role === "mentor";
      }
      return !!token;
    },
  },
});
export const config = {
  matcher: ["/admin:path*", "/mentor:path*", "/profile"],
};
