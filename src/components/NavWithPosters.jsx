import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CritiXLogo from './CritiXLogo';
import SearchBar from './SearchBar';

// Lokale bildeimporter for Modern Hollywood
import topGunImg from '../assets/images/posters/modern/topgun.png';
import barbieImg from '../assets/images/posters/modern/barbie.png';
import batmanImg from '../assets/images/posters/modern/batman.png';
import jackImg from '../assets/images/posters/modern/jack.png';

// Lokale bildeimporter for Action Queens
import reverantImg from '../assets/images/posters/action/reverant.png';
import ironmanImg from '../assets/images/posters/action/ironman.png';
import jokerImg from '../assets/images/posters/action/joker.png';
import bumblebeeImg from '../assets/images/posters/action/bumblebee.png';
import wolwerineImg from '../assets/images/posters/action/wolwerine.png';
import harrypotterImg from '../assets/images/posters/action/harrypotter.png';

const backgrounds = [
  {
    name: 'Dark Classics',
    mode: 'multi',
    images: [
      'https://image.tmdb.org/t/p/original/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
      'https://image.tmdb.org/t/p/original/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg',
      'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      'https://image.tmdb.org/t/p/original/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
    ]
  },
  {
    name: 'Modern Hollywood Icons',
    mode: 'single',
    images: [topGunImg, barbieImg, batmanImg, jackImg]
  },
  {
    name: 'Action Queens',
    mode: 'single',
    images: [reverantImg, ironmanImg, jokerImg, bumblebeeImg, wolwerineImg, harrypotterImg]
  },
];

const NavWithPosters = ({ darkMode, setDarkMode }) => {
  const [bgIndex, setBgIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentBg = backgrounds[bgIndex];

  useEffect(() => {
    if (isHovered) return;

    const duration = 4000;

    const interval = setInterval(() => {
      if (currentBg.mode === 'single') {
        const nextImage = (imageIndex + 1) % currentBg.images.length;
        if (nextImage === 0) {
          setBgIndex((prev) => (prev + 1) % backgrounds.length);
        }
        setImageIndex(nextImage);
      } else {
        setBgIndex((prev) => (prev + 1) % backgrounds.length);
      }
    }, duration);

    return () => clearInterval(interval);
  }, [bgIndex, currentBg, imageIndex, isHovered]);

  const getPositionForImage = (imgUrl) => {
    if (typeof imgUrl === 'string') {
      if (imgUrl.includes('topgun')) return 'center 35%';
      if (imgUrl.includes('barbie')) return 'center';
      if (imgUrl.includes('batman')) return 'center 30%';
      if (imgUrl.includes('jack')) return 'center';
    } else {
      if (imgUrl === topGunImg) return 'center 35%';
      if (imgUrl === barbieImg) return 'center';
      if (imgUrl === batmanImg) return 'center 30%';
      if (imgUrl === jackImg) return 'center';
      if (imgUrl === bumblebeeImg) return 'center 35%';
      if (imgUrl === wolwerineImg) return 'center 180%';
    }
    return 'center';
  };

  const bgStyle = useMemo(() => {
    const isModernIcons = currentBg.name === 'Modern Hollywood Icons';
    const isSingle = currentBg.mode === 'single';
    const currentImage = currentBg.images[imageIndex];

    const images = isSingle
      ? `url(${currentImage})`
      : currentBg.images.map(url => `url(${url})`).join(', ');

    return {
      backgroundImage: images,
      backgroundBlendMode: isModernIcons ? 'normal' : 'overlay',
      backgroundSize: 'cover',
      backgroundPosition: isModernIcons || currentBg.name === 'Action Queens' ? getPositionForImage(currentImage) : 'center',
      backgroundRepeat: 'no-repeat',
      transition: 'background-image 0.8s ease-in-out'
    };
  }, [currentBg, imageIndex]);

  const overlayClass = currentBg.name === 'Modern Hollywood Icons'
    ? 'bg-gradient-to-b from-black/50 to-black/70'
    : currentBg.mode === 'single'
    ? 'bg-black/40'
    : 'bg-black/70';

  return (
    <nav
      className="relative text-white p-4 min-h-[500px] overflow-hidden"
      style={bgStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={imageIndex + bgIndex}
          initial={{ opacity: 1 }}
          animate={{ opacity: 2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${overlayClass} z-0`}
          style={bgStyle}
        />
      </AnimatePresence>

      {/* Dark Mode Toggle Button */}
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
          <li><button className="text-white px-4 py-1 rounded hover:bg-gray-700 transition">Home</button></li>
          <li><button className="text-white px-4 py-1 rounded hover:bg-gray-700 transition">Last Reviews</button></li>
          <li><button className="text-white px-4 py-1 rounded hover:bg-gray-700 transition">Movies</button></li>
          <li><button className="text-white px-4 py-1 rounded hover:bg-gray-700 transition">Best Reviews</button></li>
          <li><button className="text-white px-4 py-1 rounded hover:bg-gray-700 transition">About Us</button></li>
          <li><button className="text-white px-4 py-1 rounded hover:bg-gray-700 transition">Sign in</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavWithPosters;
