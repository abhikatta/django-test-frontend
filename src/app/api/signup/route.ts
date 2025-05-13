import { loginSchema } from "@/lib/schema";
import { api } from "@/lib/server/constants-secret";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const json = await req.json();
    const parsedData = loginSchema.safeParse(json);
    if (!parsedData.success) {
      return new NextResponse(
        JSON.stringify({
          errrors: parsedData.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = parsedData.data;
    const res = await fetch(`${process.env.BASE_URL}${api.accounts.signup}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
