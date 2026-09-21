import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Updated signature: params is now a Promise in modern Next.js
async function handleProxy(
  request: NextRequest,
  props: { params: Promise<{ slug: string[] }> }
) {
  // 1. Await the params first
  const params = await props.params;
  const path = params.slug.join("/");
  const searchParams = request.nextUrl.searchParams.toString();
  const targetUrl = `${API_BASE_URL}/${path}${searchParams ? `?${searchParams}` : ""}`;

  // 2. FIX: Await the cookies() function before calling .get()
  const cookieStore = await cookies();
  const token = cookieStore.get("memoir_access_token")?.value;

  const headers = new Headers(request.headers);
  headers.delete("host"); // Allow fetch to set the correct host for FastAPI

  // Securely attach the token for the backend
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const body =
      request.method !== "GET" && request.method !== "HEAD"
        ? await request.text()
        : undefined;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
    });

    const data = await response.text();
    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { detail: "Internal Server Proxy Error" },
      { status: 500 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;