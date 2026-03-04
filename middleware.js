import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // public routes that should NEVER be blocked
  const publicRoutes = ["/login", "/", "/favicon.ico"];

  const isPublic = publicRoutes.some((route) => path.startsWith(route));

  if (isPublic) {
    return NextResponse.next();
  }

  const hasSession =
    request.cookies.get("sb-access-token") ||
    request.cookies.get("sb-refresh-token");

  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mockup/:path*",
    "/analytics/:path*",
    "/choose-username/:path*",
  ],
};