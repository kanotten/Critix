import React from "react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  genre,
  setGenre,
  releaseYear,
  setReleaseYear,
  genres,
  years,
}) => {
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
        {(genres || []).map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <select
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">All Years</option>

        {(years || []).map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
