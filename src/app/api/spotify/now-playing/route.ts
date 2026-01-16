import { getNowPlaying } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const data = await getNowPlaying();
    return NextResponse.json(data);
}
