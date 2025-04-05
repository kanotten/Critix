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
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 justify-center mb-8 px-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="🔍 Search movies by title..."
        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        aria-label="Search movies by title"
      />
      {/* 🔽 Filtrering etter genre */}
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        aria-label="Filter movies by genre"
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
        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        aria-label="Filter movies by release year"
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
