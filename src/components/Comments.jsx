// components/Comments.jsx
import React, { useState, useEffect } from "react";
import sanityClient from "../api/sanity";

const Comments = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const query = `*[_type == "comment" && movie._ref == $movieId] | order(_createdAt desc){
        _id, name, comment, _createdAt
      }`;
      const params = { movieId };
      const result = await sanityClient.fetch(query, params);
      setComments(result);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

    if (!user) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      const newDoc = {
        _type: "comment",
        name: user.email,
        comment: newComment,
        movie: {
          _type: "reference",
          _ref: movieId,
        },
      };

      await sanityClient.create(newDoc);
      setNewComment("");
      fetchComments(); // Refresh comments
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [movieId]);

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

      {/* Show Comments */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((cmt) => (
            <div key={cmt._id} className="border-b pb-2">
              <p className="font-semibold">{cmt.name}</p>
              <p>{cmt.comment}</p>
              <p className="text-xs text-gray-400">
                {new Date(cmt._createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
