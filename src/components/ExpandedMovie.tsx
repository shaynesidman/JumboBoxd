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
        <div>
            <img src={movie?.poster} alt={movie?.title} />
            <h1>{movie?.title}</h1>
            <p>Year: {movie?.year}</p>
            <p>{movie?.description}</p>
        </div>
    );
}
  