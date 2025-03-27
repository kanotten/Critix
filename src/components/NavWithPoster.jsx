import React, { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import CritiXLogo from './CritiXLogo';
import SearchBar from './SearchBar';
import axios from 'axios';
import useAuthStore from "../store/auth";

const NavWithPosters = ({ darkMode, setDarkMode }) => {
  const [moviesWithPosters, setMoviesWithPosters] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // ✅ Hent auth-status

  useEffect(() => {
    axios.get('https://critix-backend.onrender.com/api/movies')
      .then((res) => {
        const validPosters = res.data.filter(movie => movie.poster && movie.poster.trim() !== '');
        setMoviesWithPosters(validPosters);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
      });
  }, []);

  useEffect(() => {
    if (isHovered || moviesWithPosters.length === 0) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % moviesWithPosters.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, moviesWithPosters]);

  const currentPoster = moviesWithPosters[imageIndex]?.poster;

  const bgStyle = useMemo(() => ({
    backgroundImage: `url(${currentPoster})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
    backgroundRepeat: 'no-repeat',
    transition: 'background-image 0.8s ease-in-out'
  }), [currentPoster]);

  const overlayClass = 'bg-gradient-to-b from-black/50 to-black/70';

  return (
    <nav
      className="relative text-white p-4 min-h-[500px] overflow-hidden"
      style={bgStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait"> 
        <motion.div
          key={imageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${overlayClass} z-0`}
          style={bgStyle}
        />
      </AnimatePresence>

      {/* Dark Mode Toggle */}
      <button onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-4 right-2 text-xs px-3 py-1 rounded transition z-10 
        ${darkMode ? 'bg-white text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-gray-800'}`}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Logo */}
      <div className="absolute top-4 left-6 z-10">
        <CritiXLogo size={120} />
      </div>

      {/* Innhold */}
      <div className="relative z-10 flex flex-col items-center space-y-2 mt-60">
        <SearchBar />
        <ul className="hidden md:flex flex-wrap justify-center space-x-4 mt-24 bg-black bg-opacity-60 p-2">
          <li>
            <button className="text-white px-4 py-1 rounded hover:bg-gray-700 transition">
              Home
            </button>
          </li>

          {/* ✅ Vis Dashboard bare hvis logget inn */}
          {isAuthenticated && (
            <li>
              <button className="text-white px-4 py-1 rounded hover:bg-gray-700 transition">
                Dashboard
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavWithPosters;