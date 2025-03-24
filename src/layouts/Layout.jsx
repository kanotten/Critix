import React, { useState } from 'react';
import NavWithPosters from '../components/NavWithPosters';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-500`}>
      <NavWithPosters darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="p-4">{children}</main>
      
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Layout;