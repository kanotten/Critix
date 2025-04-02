import React from "react";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={() => onClick(movie._id)}
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
        <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
          See Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
