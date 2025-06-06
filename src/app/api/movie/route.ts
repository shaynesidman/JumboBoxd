import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Extract movie ID from search parameters.
    const { searchParams } = new URL(request.url);
    const movieID = searchParams.get("id");

    try {
        const response = await fetch(`https://jumboboxd.soylemez.net/api/movie?id=${movieID}`);

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch movie ${movieID}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`Error fetching movie ${movieID} from movie API: `, error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}