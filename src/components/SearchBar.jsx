import React, { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <input
      type="text"
      placeholder="Find the movie..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="px-4 py-1 border-4 border-black-600 focus:outline-none text-center"
    />
  );
};

export default SearchBar;