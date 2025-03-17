import React, { useState } from 'react'
import CritiXLogo from './CritiXLogo';

const Navbar  = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] =useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  
  return (
    <nav>
      <CritiXLogo size={60}color='#FF3D00'/>
      <input 
        type="text"
        placeholder="Find the movie...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={()=> setMenuOpen(!menuOpen)}>Menu</button>
        <button onClick={()=> setDarkMode(!darkMode)}>Dark Mode</button>
    </nav>
  );
};

export default Navbar;