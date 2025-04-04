import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../store/auth.js";

const Dashboard = () => {
  const [movies, setMovies] = useState([]); // List of movies
  const [selectedMovie, setSelectedMovie] = useState(null); // Selected movie for rating/comments
  const [userRatings, setUserRatings] = useState([]); // User-specific ratings
  const [newRating, setNewRating] = useState(""); // New rating input
  const [newComment, setNewComment] = useState(""); // New comment input
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { token, userRole, userId } = useAuthStore();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!token) {
        setError("No authentication token found. Please log in.");
        return;
      }
      try {
        const response = await axios.get(
          "https://critix-backend.onrender.com/api/movies",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setMovies(response.data);
      } catch {
        setError("Error fetching movies. Please try again.");
      }
    };

    const fetchUserRatings = async () => {
      if (!token || !userId) return;
      try {
        const response = await axios.get(`/api/ratings?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRatings(response.data);
      } catch {
        setError("Error fetching user ratings.");
      }
    };

    fetchMovies();
    fetchUserRatings();
  }, [token, userId]);

  const handleRateMovie = async () => {
    if (!selectedMovie || !newRating) {
      setError("Please select a movie and provide a rating.");
      return;
    }
    try {
      await axios.post(
        "/api/ratings",
        { movieId: selectedMovie._id, rating: newRating, userId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSuccessMessage("Rating submitted successfully!");
      setError("");
      setNewRating("");
    } catch {
      setError("Error submitting rating. Please try again.");
    }
  };

  const handleAddComment = async () => {
    if (!selectedMovie || !newComment) {
      setError("Please select a movie and provide a comment.");
      return;
    }
    try {
      await axios.post(
        "/api/comments",
        { movieId: selectedMovie._id, text: newComment, userId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSuccessMessage("Comment added successfully!");
      setError("");
      setNewComment("");
    } catch {
      setError("Error adding comment. Please try again.");
    }
  };

  const handleEditComment = async (commentId, updatedText) => {
    try {
      await axios.patch(
        `/api/comments/${commentId}`,
        { text: updatedText },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSuccessMessage("Comment updated successfully!");
    } catch {
      setError("Error updating comment.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Movie List */}
      <h2 className="text-xl font-bold mb-4">All Movies</h2>
      <ul className="space-y-2">
        {movies.map((movie) => (
          <li key={movie._id} className="flex items-center justify-between">
            <span
              className="cursor-pointer text-blue-500 hover:underline"
              onClick={() => setSelectedMovie(movie)}
            >
              {movie.title}
            </span>
            {userRole === "admin" && (
              <button
                className="text-red-500 hover:underline"
                onClick={() => console.log("Delete movie:", movie._id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Selected Movie Actions */}
      {selectedMovie && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">
            Selected Movie: {selectedMovie.title}
          </h2>
          <div className="mt-4">
            <h3 className="font-medium">Rate this movie:</h3>
            <input
              type="number"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              placeholder="Enter rating (1-5)"
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={handleRateMovie}
              className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit Rating
            </button>
          </div>
          <div className="mt-4">
            <h3 className="font-medium">Add a comment:</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here"
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={handleAddComment}
              className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}

      {/* User Ratings and Comments */}
      {userRatings.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Your Ratings and Comments</h2>
          <ul className="space-y-2">
            {userRatings.map((rating) => (
              <li
                key={rating._id}
                className="flex items-center justify-between"
              >
                <div>
                  <strong>{rating.movie?.title}</strong>:{" "}
                  {rating.text || "No comment"} (Rating: {rating.rating})
                </div>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() =>
                    handleEditComment(rating._id, "Updated comment")
                  }
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
