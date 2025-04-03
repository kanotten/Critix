import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../store/auth"; // Import Zustand store

const Comments = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Retrieve token and authentication state from the Zustand store
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `https://critix-backend.onrender.com/api/comments/${movieId}`,
        );
        setComments(res.data);
      } catch (err) {
        console.error("Failed to load comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      await axios.post(
        "https://critix-backend.onrender.com/api/comments",
        {
          movieId,
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setNewComment("");

      // Refresh comments
      const res = await axios.get(
        `https://critix-backend.onrender.com/api/comments/${movieId}`,
      );
      setComments(res.data);
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Failed to post comment. Please try again.");
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">💬 Comments</h2>

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
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>

      {/* Comment List */}
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
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
      ) : (
        <p className="text-gray-600">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
};

export default Comments;
