import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie"),
    },
  };

  const session = await getSession({ req: requestForNextAuth as any });

  if (session) {
    return NextResponse.next();
  } else {
    const signInPage = "/login";
    const signInUrl = new URL(signInPage, request.nextUrl.origin);
    signInUrl.searchParams.append("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
