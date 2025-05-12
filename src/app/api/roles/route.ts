import { api } from "@/lib/server/constants-secret";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}${api.roles}`);
    if (!res.ok) {
      const errorBody = await res.text();
      return new NextResponse(errorBody, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("GET /api route error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
