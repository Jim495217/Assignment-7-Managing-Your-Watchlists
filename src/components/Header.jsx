import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Send query up to App
    if (onSearch) {
      onSearch(value);
    }

    // Always return to Home to show results
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="nav">
        <h1 className="logo">
          <Link to="/">MovieShelf</Link>
        </h1>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/watchlist">Watchlist</Link>
        </div>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={handleChange}
          />
        </form>
      </nav>
    </header>
  );
}

export default Header;
