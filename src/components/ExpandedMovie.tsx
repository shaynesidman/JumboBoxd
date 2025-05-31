"use client";

import { useState, useEffect } from "react";

type ExpandedMovieProps = {
    movieID: string;
};

type Movie = {
    title: string;
    description: string;
    id: number;
    year: number;
    poster: string;
}
  
export default function ExpandedMovie({ movieID }: ExpandedMovieProps) {
    const [movie, setMovie] = useState<Movie | null>(null)

    useEffect(() => {
        async function fetchMovie() {
            try {
                const res = await fetch(`/api/movie?id=${movieID}`);
                if (!res.ok) throw new Error(`Failed to fetch movie ${movieID}`);

                const movieInfo = await res.json();
                setMovie(movieInfo);
            } catch (error) {
                console.error("Error fetching movies: ", error);
                setMovie(null);
            }
        }

        fetchMovie();
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto">
            <img src={movie?.poster} alt={movie?.title} className="w-full mb-4 rounded" />
            <h1 className="text-2xl font-bold mb-2">{movie?.title}</h1>
            <p className="text-sm text-gray-500 mb-2">Year: {movie?.year}</p>
            <p className="text-base">{movie?.description}</p>
        </div>
    );
}
  