import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MovieDetails from './pages/MovieDetails';

function App() {
    return (
        <Router>
            <div>
                {/* Define your routes inside Routes */}
                <Routes>
                    {/* Route for Home page */}
                    <Route path="/" element={<Home />} />

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
