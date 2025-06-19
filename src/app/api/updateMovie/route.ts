import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
    const { userId, movieId, rating, seen } = await req.json();

    if (!userId || !movieId) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    try {
        const existing = await sql`
            SELECT * FROM movie WHERE user_id = ${userId} AND movie_id = ${movieId}
        `;

        if (existing.length > 0) {
            const updates = [];
            if (rating !== undefined) updates.push(sql`rating = ${rating}`);
            if (seen !== undefined) updates.push(sql`seen = ${seen}`);

            if (updates.length > 0) {
                await sql`
                    UPDATE movie
                    SET ${sql.join(updates, sql`, `)}
                    WHERE user_id = ${userId} AND movie_id = ${movieId}
                `;
            }


        } else {
            await sql`
                INSERT INTO movie (user_id, movie_id, rating, seen)
                VALUES (
                    ${userId},
                    ${movieId},
                    ${rating ?? null},
                    ${seen ?? false}
                )
            `;
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("DB error:", err);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
