interface Movie {
    id: string;
    title: string;
    year: number;
    poster: string; // or URL if it's a `URL` object
}

interface MovieCardProps {
    movie: Movie;
}
  
export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <div 
            className="flex flex-col p-4 hover:cursor-pointer transform transition-transform duration-200 hover:scale-110"
        >
            <img src={movie.poster} alt={movie.title} className="w-full h-auto mb-2 rounded-lg" />
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-xs text-gray-500">Year: {movie.year}</p>
        </div>
    );
}
  