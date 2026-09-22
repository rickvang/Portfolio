import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dev/harness")) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.next();
  }

  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*", "/dev/harness/:path*"],
  runtime: "nodejs",
};
