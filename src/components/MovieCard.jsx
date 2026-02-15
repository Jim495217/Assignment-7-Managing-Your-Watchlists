import { useEffect, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  } = useMovieContext();

  const inWatchlist = isInWatchlist(movie.id);

  // ✅ Check if movie is in Favorites (localStorage)
  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.some(
      (fav) => fav.id === movie.id
    );

    setIsFavorite(exists);
  }, [movie.id]);

  // ✅ Toggle Favorites
  const toggleFavorite = () => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(
        (fav) => fav.id !== movie.id
      );
    } else {
      updatedFavorites = [
        ...favorites,
        {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
        },
      ];
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    setIsFavorite(!isFavorite);
  };

  // ✅ Toggle Watchlist (Context)
  const handleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      });
    }
  };

  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
      />

      <h3>{movie.title}</h3>

      {movie.release_date && (
        <p>{movie.release_date}</p>
      )}

      <div className="button-group">
        {/* Favorites Button */}
        <button onClick={toggleFavorite}>
          {isFavorite
            ? "Remove from Favorites ❤️"
            : "Add to Favorites 🤍"}
        </button>

        {/* Watchlist Button */}
        <button onClick={handleWatchlist}>
          {inWatchlist
            ? "Remove from Watchlist 🎬"
            : "Add to Watchlist ➕"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
