import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [movies, setMovies] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const [userPaginated, setUserPaginated] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(0);
  };

  const handleGenreChange = (value) => {
    setGenre(value);
    setCurrentPage(0);
  };

  const handleYearChange = (value) => {
    setReleaseYear(value);
    setCurrentPage(0);
  };

  const handleMovieClick = (id) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/movie/${id}`);
    }, 100);
  };

  useEffect(() => {
    if (userPaginated) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setUserPaginated(false);
    }
  }, [currentPage, userPaginated]);

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

  useEffect(() => {
    const updateMoviesPerPage = () => {
      const width = window.innerWidth;

      if (width >= 1280) setMoviesPerPage(15); // 5 columns × 3 rows
      else if (width >= 1024) setMoviesPerPage(12); // 4 columns × 3 rows
      else if (width >= 768) setMoviesPerPage(9); // 3 columns × 3 rows
      else setMoviesPerPage(6); // 2 columns × 3 rows
    };

    updateMoviesPerPage(); // Kjør én gang først
    window.addEventListener("resize", updateMoviesPerPage);

    return () => window.removeEventListener("resize", updateMoviesPerPage);
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [movies]);

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <Spinner />;

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
        <div className="flex justify-center items-center gap-2 sm:gap-6 mb-14 px-4">
          <button
            onClick={handlePrev}
            className="text-3xl px-4 py-2 bg-white rounded-full shadow hover:bg-gray-200 transition"
            aria-label="Show previous featured movie"
          >
            ←
          </button>

          <div
            className="text-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => handleMovieClick(movies[carouselIndex]._id)}
          >
            <div className="relative w-64 h-96 sm:w-[22rem] sm:h-[32rem] bg-gray-200 rounded-xl shadow-lg overflow-hidden mx-auto mb-4">
              <AnimatePresence mode="wait">
                {movies[carouselIndex]?.poster && (
                  <motion.img
                    key={movies[carouselIndex]._id}
                    src={movies[carouselIndex].poster}
                    alt={movies[carouselIndex].title || "Unknown Title"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </AnimatePresence>
            </div>

            <p className="text-xl font-semibold text-gray-700">
              {movies[carouselIndex].title}
            </p>
          </div>
          <button
            onClick={handleNext}
            className="text-3xl px-4 py-2 bg-white rounded-full shadow hover:bg-gray-200 transition"
            aria-label="Show next featured movie"
          >
            →
          </button>
        </div>
      )}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        genre={genre}
        setGenre={handleGenreChange}
        releaseYear={releaseYear}
        setReleaseYear={handleYearChange}
        genres={genres}
        years={years}
      />

      {/* Grid Section */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🎬 Movie List
      </h1>
      {filteredMovies.length === 0 ? (
        <div className="text-center mt-10 text-gray-600 text-lg">
          😞 Oops! No movies found. Try adjusting your search or filters
          <span role="img" aria-label="no movies found" className="text-2xl">
            🔍
          </span>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {moviesToDisplay.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={handleMovieClick}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 my-10">
        <button
          onClick={() => {
            setCurrentPage((prev) => Math.max(prev - 1, 0));
            setUserPaginated(true);
          }}
          disabled={currentPage === 0}
          className="bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300 disabled:opacity-50"
          aria-label="Go to previous page"
        >
          Previous
        </button>
        <button
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
            setUserPaginated(true);
          }}
          disabled={(currentPage + 1) * moviesPerPage >= filteredMovies.length}
          className="bg-gray-200 px-4 py-2 rounded shadow hover:bg-gray-300 disabled:opacity-50"
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
