import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  if (request.nextUrl.pathname === "/") {
    const redirectAdmin = request.nextUrl.clone();
    redirectAdmin.pathname = "/login";
    return NextResponse.redirect(redirectAdmin);
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    // if there's no token or role, will redirect to /login page
    if (!token || !role) {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/login";
      return NextResponse.redirect(redirectAdmin);
    }

    // if tole is not ADMIN, redirect to login page
    if (role !== "ADMIN") {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/login";
      return NextResponse.redirect(redirectAdmin);
    }

    // If all checks are successful, proceed to the requested page.
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/student")) {
    // if there's no token or role, will redirect to /login page
    if (!token || !role) {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/login";
      return NextResponse.redirect(redirectAdmin);
    }

    // if tole is not STUDENT, redirect to login page
    if (role !== "STUDENT") {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/login";
      return NextResponse.redirect(redirectAdmin);
    }

    // If all checks are successful, proceed to the requested page.
    return NextResponse.next();
  }

  // For all other pages, continue without changes.
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/admin/:path", // catch all route under /admin
    "/", // catch all root route
    "/student/:path", // catch all route under /student
  ],
};
