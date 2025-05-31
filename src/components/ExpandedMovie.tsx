type ExpandedMovieProps = {
    movieID: string;
};
  
export default function ExpandedMovie({ movieID }: ExpandedMovieProps) {
    return (
        <div>
            <p>Movie ID: {movieID}</p>
        </div>
    );
}
  