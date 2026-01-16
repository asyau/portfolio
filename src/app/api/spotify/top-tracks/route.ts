import { getTopTracks } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
    const tracks = await getTopTracks();
    return NextResponse.json(tracks);
}
