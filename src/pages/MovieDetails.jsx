import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { urlFor } from "../api/sanity";
import Comments from "../components/Comments";
import Rating from "../components/Rating";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://critix-backend.onrender.com/api/movies/${id}`,
        );
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to Home
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Poster */}
        {movie?.poster?.asset && (
          <img
            src={urlFor(movie.poster).url()}
            alt={movie?.title || "Movie Poster"}
            className="w-full rounded-lg shadow-lg"
          />
        )}

        {/* Movie Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {movie?.title || "Untitled"}
          </h1>
          <p className="text-gray-700 mb-4">
            {movie?.description || "No description available."}
          </p>

          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Release Year:</strong> {movie?.releaseYear || "N/A"}
            </p>
            <p>
              <strong>Genre:</strong> {movie?.genre || "N/A"}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">🎬 Cast</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {movie?.castMembers?.length > 0 ? (
                movie.castMembers.map((cast, i) => (
                  <li key={i}>
                    <strong>{cast.characterName}</strong>:{" "}
                    {cast.person?.name || "Unknown"}
                  </li>
                ))
              ) : (
                <li>No cast info</li>
              )}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">🎥 Crew</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {movie?.crewMembers?.length > 0 ? (
                movie.crewMembers.map((crew, i) => (
                  <li key={i}>
                    <strong>{crew.job}</strong>:{" "}
                    {crew.person?.name || "Unknown"}
                  </li>
                ))
              ) : (
                <li>No crew info</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Rating movieId={movie._id} />
      {/* Comments Section */}
      {movie && <Comments movieId={movie._id} />}
    </div>
  );
};

export default MovieDetails;
