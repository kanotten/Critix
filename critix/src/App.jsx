
import React from "react";
import Navbar from "./components/Navbar.jsx";


const App = () => {
  return (
    <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-grey"></div>
          <Navbar />
          <div className="flex items-center justify-center h-screen"></div>
          <h1 className="text-4xl font-bold text-blue-500">Critix Demo Home Page 🎉</h1>
    </>
    
  ); 
};

export default App;
