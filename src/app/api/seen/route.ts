import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get("id");

    try {
        const result = await sql`SELECT * FROM movies LIMIT 10`;
        return NextResponse.json(result);
    } catch (err) {
        console.error("Error fetching movies:", err);
        return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
    }
}
