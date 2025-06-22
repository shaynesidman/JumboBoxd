"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

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
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [seen, setSeen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const { user } = useUser();

    useEffect(() => {
        async function fetchMovie() {
            try {
                const res = await fetch(`/api/movie?id=${movieID}`);
                if (!res.ok) throw new Error(`Failed to fetch movie ${movieID}`);

                const movieInfo = await res.json();
                setMovie(movieInfo);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching movies: ", error);
                setMovie(null);
            }
        }

        async function fetchMovieInfo() {
            if (!user) return;
        
            try {
                const res = await fetch(`/api/fetchMovie?userId=${user.id}&movieId=${movieID}`);
                if (!res.ok) throw new Error(`Failed to fetch movie ${movieID}'s info`);
                
                if (res.status === 404) {
                    // Movie not found for this user - set default values
                    setSeen(false);
                    setRating(0);
                    return;
                }
                
                if (!res.ok) {
                    throw new Error(`Failed to fetch movie info: ${res.status}`);
                }
        
                const movieInfo = await res.json();
                
                // Update state with the fetched data
                if (movieInfo.movie) {
                    setSeen(movieInfo.movie.seen || false);
                    setRating(movieInfo.movie.rating || 0);
                }
                
            } catch (error) {
                console.error("Error fetching movie information:", error);
                // Set default values on error
                setSeen(false);
                setRating(0);
            }
        }

        fetchMovie();
        fetchMovieInfo();
    }, []);

    async function handleSeenClick() {
        if (!user || !movie) return;

        setSeen(!seen);
      
        try {
            const res = await fetch("/api/updateMovie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    movieId: movie.id,
                    seen: !seen,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error("Failed to mark as seen");
        } catch (error) {
          console.error("Error updating seen status:", error);
        }
    }
      

    async function handleRatingClick(star: number) {
        if (!user || !movie) return;
      
        setRating(star); // TODO: Change this
      
        try {
            const res = await fetch("/api/updateMovie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    movieId: movie.id,
                    rating: star,
                }),
            });
        
            const data = await res.json();
            if (!res.ok) throw new Error("Failed to rate");
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    }
      

    if (!loading) {
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

                    {/* Render buttons only if users are logged in */}
                    {user && (
                        <div className="flex flex-row justify-between">
                            <button 
                                className={`bg-white shadow-sm hover:shadow-lg ${seen ? `text-green-600` : `text-black`} rounded-md py-1 px-2 cursor-pointer`}
                                onClick={handleSeenClick}
                            >
                                Seen?
                            </button>
                            
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => handleRatingClick(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className={`text-2xl transition-colors ${
                                            (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                    >
                                    ★
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-black"></div>
        </div>
    );
}
  