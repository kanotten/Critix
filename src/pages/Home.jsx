import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(res.data);
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
          <div className="text-center">
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

      {/* Grid Section */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🎬 Movie List
      </h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <div
            key={movie._id}
            onClick={() => handleMovieClick(movie._id)}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-700 truncate">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
