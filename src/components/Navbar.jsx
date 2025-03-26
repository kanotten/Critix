import React, { useState } from 'react';
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";


const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 flex items-center justify-between">
      <SearchBar />

      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white bg-red-500 px-4 py-2 rounded-lg">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="text-white bg-gray-800 px-4 py-2 rounded-lg"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <button className="text-white bg-red-500 px-4 py-2 rounded-lg">
            Logg inn
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
