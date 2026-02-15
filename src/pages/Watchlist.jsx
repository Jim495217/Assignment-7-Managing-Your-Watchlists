import { useMovieContext } from "../contexts/MovieContext";
import MovieGrid from "../components/MovieGrid";

function Watchlist() {
  const { watchlist } = useMovieContext();

  return (
    <div>
      <h2>Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <MovieGrid movies={watchlist} />
      )}
    </div>
  );
}

export default Watchlist;
