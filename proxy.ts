import { NextResponse, NextRequest } from "next/server";
import { getSession } from "./actions/session";
import { authRoutes, privateRoutes } from "./constants";

export async function proxy(request: NextRequest) {
  // const cookie = request.cookies.get("session");
  // const hasCookie = request.cookies.has("session");
  const session = await getSession();
  const response = NextResponse.next();
  const isAuthRoutes = authRoutes.includes(request.nextUrl.pathname);
  const isPrivateRoutes = privateRoutes.includes(request.nextUrl.pathname);
  if (isAuthRoutes && session.isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (
    isPrivateRoutes &&
    (!session.isLoggedIn || !session.name || !session.username)
  ) {
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
    "/sign-in/:path*",
    "/sign-up/:path*",
  ],
};
