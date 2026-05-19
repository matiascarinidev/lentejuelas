import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const allowedOrigins = ["http://localhost:3002"];

  if (request.method === "OPTIONS") {
    return NextResponse.json(
      {},
      {
        headers: {
          "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
            ? origin
            : "",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }

  const response = NextResponse.next();

  if (allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
