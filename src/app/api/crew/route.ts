import { createCrewSchema } from "@/lib/schema";
import { api } from "@/lib/server/constants-secret";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const json = await request.json();
    const result = createCrewSchema.safeParse(json);

    if (!result.success) {
      return new NextResponse(
        JSON.stringify({ errors: result.error.flatten().fieldErrors }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = result.data;
    const res = await fetch(`${process.env.BASE_URL}${api.crew}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorBody = await res.text();
      return new NextResponse(JSON.stringify(errorBody), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const response = await res.json();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 400 });
  }
};

export const GET = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}${api.crew}`);
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
    const res = await fetch(`${process.env.BASE_URL}${api.crew}${id}/`, {
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

export const PATCH = async (request: Request) => {
  try {
    const { id, data } = await request.json();
    const crewData = createCrewSchema.safeParse(data);
    if (!crewData.success) {
      return new NextResponse(
        JSON.stringify({ errors: crewData.error.flatten().fieldErrors }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const res = await fetch(`${process.env.BASE_URL}${api.crew}${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crewData.data),
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
