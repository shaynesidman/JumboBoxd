import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const movieId = searchParams.get('movieId');

        if (!userId || !movieId) {
            return NextResponse.json(
                { error: "Missing userId or movieId parameters" }, 
                { status: 400 }
            );
        }

        const data = await sql`
            SELECT * FROM movie 
            WHERE user_id = ${userId} AND movie_id = ${movieId}
        `;

        if (data.length === 0) {
            return NextResponse.json({ movie: null });
        }

        return NextResponse.json({ movie: data[0] });

    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch movie" }, 
            { status: 500 }
        );
    }
}