import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Token Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to get token",
      },
      { status: 500 }
    );
  }
}