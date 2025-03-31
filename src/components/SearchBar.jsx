import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery, genre, setGenre }) => {
  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="🔍 Search movies by title..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />
      {/* 🔽 Filtrering etter genre */}
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="NOeggs">NOeggs</option>
        {/* legg til flere hvis ønskelig */}
      </select>
    </div>
  );
};

export default SearchBar;
