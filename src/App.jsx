import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// In your index.js or App.js
import './index.css'; // or wherever your tailwind.css file is



import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
function App() {
    return (
        <Router>
            <div>
                {/* Define your routes inside Routes */}
                <Routes>
                    {/* Route for Home page */}
                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />

                    {/* Route for Dashboard page */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Route for Movie Details page, dynamic route for movieId */}
                    <Route path="/movie/:movieId" element={<MovieDetails />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
