"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const login = cookies().get("nim");
  console.log(login);

  if (!login) {
    return NextResponse.redirect(new URL("http://localhost:3000/login"));
  }

  return NextResponse.rewrite(new URL(request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/about"],
};
