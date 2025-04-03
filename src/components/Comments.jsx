import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../store/auth";

const Comments = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Retrieve token and authentication state from Zustand store
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Fetch comments for the movie
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(""); // Clear previous errors
        const { data } = await axios.get(
          `https://critix-backend.onrender.com/api/comments/${movieId}`,
        );
        setComments(data);
      } catch {
        setError("Failed to load comments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [movieId]);

  // Handle comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      setError(""); // Clear previous errors
      await axios.post(
        "https://critix-backend.onrender.com/api/comments",
        { movieId, content: newComment },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setNewComment(""); // Clear the input field

      // Refresh comments after successful submission
      const { data } = await axios.get(
        `https://critix-backend.onrender.com/api/comments/${movieId}`,
      );
      setComments(data);
    } catch {
      setError("Failed to post comment. Please try again.");
    }
  };

  // Render error message
  const renderError = () => {
    if (error) {
      return <p className="text-red-500 text-sm mb-4">{error}</p>;
    }
    return null;
  };

  // Render loading state
  const renderLoading = () => {
    if (loading) {
      return <p>Loading comments...</p>;
    }
    return null;
  };

  // Render comment list or empty state
  const renderComments = () => {
    if (comments.length > 0) {
      return (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="border-b pb-2">
              <p className="font-semibold text-sm">{comment.author}</p>
              <p className="text-gray-800">{comment.content}</p>
              <p className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return (
      <p className="text-gray-600">No comments yet. Be the first to comment!</p>
    );
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">💬 Comments</h2>

      {renderError()}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          rows={4}
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={!isAuthenticated || loading}
        >
          Post Comment
        </button>
      </form>

      {/* Loading State or Comment List */}
      {renderLoading() || renderComments()}
    </div>
  );
};

export default Comments;
