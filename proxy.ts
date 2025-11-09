import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  //   const cookie = request.cookies.get("session");
  const hasCookie = request.cookies.has("session");
  const response = NextResponse.next();
  if (!hasCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/events/:path*",
    "/meetings/:path*",
    "/availability/:path*",
  ],
};
