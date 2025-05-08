import { createAccountSchema } from "@/lib/schema";
import { api } from "@/lib/server/constants-secret";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const json = await request.json();
    const result = createAccountSchema.safeParse(json);

    if (!result.success) {
      return new NextResponse(
        JSON.stringify({ errors: result.error.flatten().fieldErrors }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = result.data;
    const res = await fetch(`${process.env.BASE_URL}${api.accounts}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorBody = await res.text();
      return new Response(errorBody, { status: res.status });
    }
    const response = await res.json();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const GET = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}${api.accounts}`);
    if (!res.ok) {
      // throw forward whatever error backend throws
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

export const DELETE = async (request: Request) => {
  try {
    const { id } = await request.json();
    const res = await fetch(`${process.env.BASE_URL}${api.accounts}${id}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const errorBody = await res.text();
      return new NextResponse(errorBody, { status: res.status });
    }
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error("DELETE /api route error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
