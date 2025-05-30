"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import { Url } from "url";

type Movie = {
    title: string;
    id: string;
    year: number;
    poster: string;
}

export default function MovieGrid() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const pageNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

                // Get all movies by fetching each page's movies.
                const fetches = pageNums.map(page =>
                    fetch(`/api/movies?page=${page}`).then(res => {
                        if (!res.ok) throw new Error(`Failed to fetch page ${page}`);
                        return res.json()
                    })
                );
                
                // Wait for all pages to return results.
                const allPages = await Promise.all(fetches);

                // Flatten array of arrays into one array.
                const allMovies = allPages.flat();

                setMovies(allMovies);
            } catch (error) {
                console.error("Error fetching movies: ", error);
                setMovies([]);
            }
        }

        fetchMovies();
    }, []);

    console.log(movies);

    return (
        <section>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    ); 
}