import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import useAuthStore from "../store/auth"; //

const Rating = ({ movieId }) => {
  const [rating, setRating] = useState(0);
  const [average, setAverage] = useState(null);
  const [rated, setRated] = useState(false);
  const [error, setError] = useState("");

  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const fetchAverageRating = async () => {
    try {
      setError("");
      const { data } = await axios.get(
        `https://critix-backend.onrender.com/api/ratings/${movieId}`,
      );

      let ratings = [];
      if (Array.isArray(data)) {
        ratings = data;
      } else if (data && Array.isArray(data.ratings)) {
        ratings = data.ratings;
      } else {
        console.warn("Unexpected response structure:", data);
        setAverage(null);
        return;
      }

      // Calculate average
      const values = ratings.map((r) => r.value);
      const avg =
        values.length > 0
          ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
          : null;
      setAverage(avg);
    } catch {
      setError("Failed to load average rating. Please try again later.");
    }
  };

  // Fetch user's own rating if logged in
  const fetchUserRating = async () => {
    if (!isAuthenticated) return; // Skip
    try {
      setError(""); // Clear
      const { data } = await axios.get(
        `https://critix-backend.onrender.com/api/ratings/user/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (data.rating) {
        setRating(data.rating);
        setRated(true);
      }
    } catch {
      setError("Failed to load your rating. Please try again later.");
    }
  };

  // new rating
  const handleRate = async (value) => {
    if (!isAuthenticated) {
      alert("Login required to rate");
      return;
    }

    try {
      setError("");
      await axios.post(
        `https://critix-backend.onrender.com/api/ratings`,
        { movieId, value },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setRating(value);
      setRated(true);
      fetchAverageRating(); // Refresh avg
    } catch {
      setError("Failed to submit rating. Please try again.");
    }
  };

  const renderError = () => {
    if (error) {
      return <p className="text-red-500 text-sm mb-2">{error}</p>;
    }
    return null;
  };

  // Render average rating
  const renderAverageRating = () => {
    if (average) {
      return (
        <p className="text-gray-600 text-sm mt-1">
          ⭐ Average Rating: <strong>{average}</strong>/5
        </p>
      );
    }
    return null;
  };

  useEffect(() => {
    fetchAverageRating();
    fetchUserRating();
  }, [movieId]);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-2">⭐ Rate this movie</h2>

      {/* Error Message */}
      {renderError()}

      {/* Star Rating */}
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            onClick={() => !rated && handleRate(star)}
            className={`cursor-pointer transition text-2xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Feedback Messages */}
      {rated && <p className="text-green-600 mt-2">Thanks for rating!</p>}
      {renderAverageRating()}
    </div>
  );
};

export default Rating;
