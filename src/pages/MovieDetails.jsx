import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://critix-backend.onrender.com/api/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load movie details.");
        setLoading(false);
      });
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
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full max-h-[500px] object-cover rounded-lg shadow-lg mb-4"
      />
      <p className="text-lg mb-4">{movie.description}</p>
      <p className="text-sm text-gray-600">Release Year: {movie.year}</p>
      <p className="text-sm text-gray-600">Genre: {movie.genre}</p>
      <p className="text-sm text-gray-600">Rating: {movie.rating}</p>
    </div>
  );
};

export default MovieDetails;
