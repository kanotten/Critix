import React, { useState } from 'react';
import CritiXLogo from './CritiXLogo';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 flex items-center justify-between">

      <CritiXLogo size={150} />

      <SearchBar />

      <ul className="flex space-x-4">
        <li><button className="text-white bg-red-500 px-4 py-2 rounded-lg">Home</button></li>
        <li><button className="text-white bg-gray-800 px-4 py-2 rounded-lg">Last Reviews</button></li>
        <li><button className="text-white bg-gray-800 px-4 py-2 rounded-lg">Movies</button></li>
        <li><button className="text-white bg-gray-800 px-4 py-2 rounded-lg">Best Reviews</button></li>
        <li><button className="text-white bg-gray-800 px-4 py-2 rounded-lg">About Us</button></li>
        <li><button className="text-white bg-gray-800 px-4 py-2 rounded-lg">Menu</button></li>
        <li><button className="text-white bg-red-500 px-4 py-2 rounded-lg">Logg inn</button></li>
        <li><button onClick={() => setDarkMode(!darkMode)} className="text-white bg-gray-700 px-4 py-2 rounded-lg">Dark Mode</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
