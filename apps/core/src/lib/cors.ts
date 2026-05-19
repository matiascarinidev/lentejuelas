import { NextResponse } from "next/server";

export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "http://localhost:3002",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export function corsResponse(data: any, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders(),
  });
}

export function handleOptions() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}
