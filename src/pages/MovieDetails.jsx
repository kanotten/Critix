import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://critix-backend.onrender.com/api/movies/${id}`,
        );
        console.log("Fetched movie data:", data);
        console.log(data.poster.asset._ref);
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
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">
        {movie?.title || "Unknown Title"}
      </h1>
      {movie?.poster?.asset?.url && (
        <img
          src={movie.poster.asset.url}
          alt={movie?.title || "Movie Poster"}
          className="w-full max-h-[500px] object-cover rounded-lg shadow-lg mb-4"
        />
      )}

      <p className="text-lg mb-4">
        {movie?.description || "No description available."}
      </p>
      <p className="text-sm text-gray-600">
        Release Year: {movie?.releaseYear || "N/A"}
      </p>
      <p className="text-sm text-gray-600">Genre: {movie?.genre || "N/A"}</p>
      <h2 className="text-xl font-semibold mb-2">Crew Members</h2>
      <ul className="list-disc pl-4">
        {movie?.crewMembers?.length > 0 ? (
          movie.crewMembers.map((crew, index) => (
            <li key={index}>
              {crew.job}: {crew.person?.name || "Unknown"}
            </li>
          ))
        ) : (
          <li>No crew members available</li>
        )}
      </ul>
      <h2 className="text-xl font-semibold mt-4 mb-2">Cast Members</h2>
      <ul className="list-disc pl-4">
        {movie?.castMembers?.length > 0 ? (
          movie.castMembers.map((cast, index) => (
            <li key={index}>
              {cast.characterName}: {cast.person?.name || "Unknown"}
            </li>
          ))
        ) : (
          <li>No cast members available</li>
        )}
      </ul>
    </div>
  );
};

export default MovieDetails;
