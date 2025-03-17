import React, { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <input
      type="text"
      placeholder="Find the movie..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  );
};

export default SearchBar;