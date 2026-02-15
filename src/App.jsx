import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";

import { MovieProvider } from "./contexts/MovieContext";
import { searchMovies } from "./services/movieService";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <MovieProvider>
      <Router>
        <Header onSearch={handleSearch} />

        <Routes>
          <Route
            path="/"
            element={<Home searchResults={searchResults} />}
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </MovieProvider>
  );
}

export default App;
