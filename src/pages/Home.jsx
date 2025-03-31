import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [movies, setMovies] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 10; // Antall filmer per side

  const navigate = useNavigate();

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  useEffect(() => {
    axios
      .get("https://critix-backend.onrender.com/api/movies")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError("Error fetching movies. Please try again.");
        setLoading(false);
      });
  }, []);

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold">Loading movies...</h2>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
      </div>
    );
  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenre = genre ? movie.genre === genre : true;
    const matchesYear = releaseYear ? movie.releaseYear === releaseYear : true;
    return matchesTitle && matchesGenre && matchesYear;
  });

  const moviesToDisplay = filteredMovies.slice(
    currentPage * moviesPerPage,
    (currentPage + 1) * moviesPerPage
  );
  const genres = [...new Set(movies.map((movie) => movie.genre))].filter(
    Boolean
  );
  const years = [...new Set(movies.map((movie) => movie.releaseYear))].filter(
    Boolean
  );

  return (
    <div className="px-6 py-10 bg-gray-100 min-h-screen">
      {/* Carousel Section */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🔥 Featured Movie
      </h2>
      {movies.length > 0 && (
        <div className="flex justify-center items-center gap-6 mb-14">
          <button
            onClick={handlePrev}
            className="text-3xl px-4 py-2 bg-white rounded-full shadow hover:bg-gray-200 transition"
          >
            ←
          </button>
          <div
            className="text-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => handleMovieClick(movies[carouselIndex]._id)}
          >
            <img
              src={movies[carouselIndex].poster}
              alt={movies[carouselIndex].title}
              className="h-96 w-64 object-cover rounded-xl shadow-lg mx-auto mb-4"
            />
            <p className="text-xl font-semibold text-gray-700">
              {movies[carouselIndex].title}
            </p>
          </div>
          <button
            onClick={handleNext}
            className="text-3xl px-4 py-2 bg-white rounded-full shadow hover:bg-gray-200 transition"
          >
            →
          </button>
        </div>
      )}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        genre={genre}
        setGenre={setGenre}
        releaseYear={releaseYear}
        setReleaseYear={setReleaseYear}
        genres={genres}
        years={years}
      />

      {/* Grid Section */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🎬 Movie List
      </h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {moviesToDisplay.map((movie) => (
          <MovieCard key={movie._id} movie={movie} onClick={handleMovieClick} />
        ))}
      </div>
      <div className="flex justify-center gap-4 my-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={(currentPage + 1) * moviesPerPage >= filteredMovies.length}
          className="bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
