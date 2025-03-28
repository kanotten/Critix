import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { AnimatePresence, motion } from "framer-motion";
import CritiXLogo from "./CritiXLogo";
import SearchBar from "./SearchBar";
import axios from "axios";
import useAuthStore from "../store/auth"; // For authentication state

const NavWithPosters = () => {
  const [moviesWithPosters, setMoviesWithPosters] = React.useState([]);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  // Zustand auth state and functions
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log("isAuthenticated:", isAuthenticated); // Debugging line
  const logout = useAuthStore((state) => state.logout); // Logout function
  const navigate = useNavigate(); // For navigation

  // Fetch movies with posters
  React.useEffect(() => {
    axios
      .get("https://critix-backend.onrender.com/api/movies")
      .then((res) => {
        const validPosters = res.data.filter(
          (movie) => movie.poster && movie.poster.trim() !== "",
        );
        setMoviesWithPosters(validPosters);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
      });
  }, []);

  // Auto-cycle posters
  React.useEffect(() => {
    if (isHovered || moviesWithPosters.length === 0) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % moviesWithPosters.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, moviesWithPosters]);

  const currentPoster = moviesWithPosters[imageIndex]?.poster;

  const bgStyle = {
    backgroundImage: `url(${currentPoster})`,
    backgroundSize: "cover",
    backgroundPosition: "center 30%",
    backgroundRepeat: "no-repeat",
    transition: "background-image 0.8s ease-in-out",
  };

  const overlayClass = "bg-gradient-to-b from-black/50 to-black/70";

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

      {/* Login/Logout Button */}
      <button
        onClick={() => {
          if (isAuthenticated) {
            logout(); // Call logout function
            navigate("/"); // Redirect to home after logout
          } else {
            navigate("/login"); // Redirect to login page
          }
        }}
        className="absolute top-4 right-2 text-xs px-3 py-1 rounded transition z-10 bg-black text-white hover:bg-gray-800"
      >
        {isAuthenticated ? "Logout" : "Login"}
      </button>

      {/* Logo */}
      <div className="absolute top-4 left-6 z-10">
        <CritiXLogo size={120} />
      </div>

      {/* Navigation Links */}
      <div className="relative z-10 flex flex-col items-center space-y-2 mt-60">
        <SearchBar />
        <ul className="hidden md:flex flex-wrap justify-center space-x-4 mt-24 bg-black bg-opacity-60 p-2">
          {/* Home Link */}
          <li>
            <Link
              to="/"
              className="text-white px-4 py-1 rounded hover:bg-gray-700 transition"
            >
              Home
            </Link>
          </li>

          {/* Dashboard Link (only visible if logged in) */}
          {isAuthenticated && (
            <li>
              <Link
                to="/dashboard"
                className="text-white px-4 py-1 rounded hover:bg-gray-700 transition"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavWithPosters;
