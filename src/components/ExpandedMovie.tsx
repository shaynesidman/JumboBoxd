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
                console.log(movieID)
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
        <div className="flex flex-col md:flex-row gap-6">
            <img
                src={movie?.poster}
                alt={movie?.title}
                className="w-full md:w-1/2 h-auto object-contain rounded-lg shadow"
            />
            <div className="flex flex-col gap-4">
                <h1><span className="font-bold">{movie?.title}</span> ({movie?.year})</h1>
                <p>{movie?.description}</p>
                <div className="flex flex-row justify-between">
                    <button className="bg-white shadow-sm hover:shadow-lg text-black rounded-md py-1 px-2">
                        Haven't seen
                    </button>
                    
                    <div className="flex flex-row gap-2">
                        <button className="bg-white shadow-sm hover:shadow-lg text-black rounded-md py-1 px-2">
                            Like
                        </button>
                        <button className="bg-white shadow-sm hover:shadow-lg text-black rounded-md py-1 px-2">
                            Dislike
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
  