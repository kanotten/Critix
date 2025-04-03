import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import useAuthStore from "../store/auth"; // Import Zustand store

const Rating = ({ movieId }) => {
  const [rating, setRating] = useState(0); // User's own rating
  const [average, setAverage] = useState(null); // Avg from backend
  const [rated, setRated] = useState(false); // If already rated

  // Retrieve token and authentication state from the Zustand store
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 🔹 Fetch average rating for this movie
  const fetchAverageRating = async () => {
    try {
      const { data } = await axios.get(
        `https://critix-backend.onrender.com/api/ratings/${movieId}`,
      );

      // Handle different response structures
      let ratings = [];
      if (Array.isArray(data)) {
        ratings = data; // Direct array
      } else if (data && Array.isArray(data.ratings)) {
        ratings = data.ratings; // Object containing an array
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
    } catch (err) {
      console.error("Error fetching average rating:", err);
    }
  };

  // 🔹 Fetch user's own rating if logged in
  const fetchUserRating = async () => {
    if (!isAuthenticated) return; // Skip if not authenticated
    try {
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
    } catch (err) {
      console.error("Error fetching user rating:", err);
    }
  };

  // 🔹 Submit a new rating
  const handleRate = async (value) => {
    if (!isAuthenticated) return alert("Login required to rate");

    try {
      await axios.post(
        `https://critix-backend.onrender.com/api/ratings`,
        { movieId, value },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setRating(value);
      setRated(true);
      fetchAverageRating(); // Refresh avg
    } catch (err) {
      console.error("Rating failed:", err);
    }
  };

  useEffect(() => {
    fetchAverageRating();
    fetchUserRating();
  }, [movieId]);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-2">⭐ Rate this movie</h2>

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

      {rated && <p className="text-green-600 mt-2">Thanks for rating!</p>}
      {average && (
        <p className="text-gray-600 text-sm mt-1">
          ⭐ Average Rating: <strong>{average}</strong>/5
        </p>
      )}
    </div>
  );
};

export default Rating;
