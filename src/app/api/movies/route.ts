import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Extract page number from search parameters.
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    try {
        const response = await fetch(`https://jumboboxd.soylemez.net/api/list?page=${page}`);

        if (!response.ok) {
        // Handle HTTP errors from the external API.
        return NextResponse.json(
            { error: `Failed to fetch page ${page}` },
            { status: response.status }
        );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`Error fetching page ${page} from list API: `, error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
