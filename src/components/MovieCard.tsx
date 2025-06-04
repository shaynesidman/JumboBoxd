"use client";

import { useState } from "react";
import ExpandedMovie from "@/components/ExpandedMovie";

interface Movie {
  id: string;
  title: string;
  year: number;
  poster: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [expandedView, setExpandedView] = useState(false);

  return (
    <>
      {/* Normal movie card */}
      <div
        className="flex flex-col p-4 hover:cursor-pointer transform transition-transform duration-200 hover:scale-110"
        onClick={() => setExpandedView(true)}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-auto mb-2 rounded-lg"
        />
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-xs text-gray-500">Year: {movie.year}</p>
      </div>

      {/* Fullscreen overlay modal */}
      {expandedView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg p-6">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black hover:cursor-pointer"
              onClick={() => setExpandedView(false)}
            >
              ✕
            </button>
            <ExpandedMovie movieID={movie.id} />
          </div>
        </div>
      )}
    </>
  );
}
