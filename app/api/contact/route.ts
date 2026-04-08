import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Simulate backend processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid Request" },
      { status: 400 }
    );
  }
}
