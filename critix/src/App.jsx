import React, { useEffect, useState } from 'react';
import { getMovies } from './movieService';
import { urlFor } from './image-url'; // Import the urlFor function

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            const data = await getMovies();
            setMovies(data);
        }
        fetchMovies();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Movie List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {movies.map((movie) => (
                    <div key={movie._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            className="w-full h-48 object-cover"
                            src={movie.poster ? urlFor(movie.poster.asset).url() : '/path/to/default-image.jpg'} // Use urlFor to get the image URL
                            alt={movie.title}
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                            <p className="text-gray-700 mb-2">{movie.description}</p>
                            <p className="text-gray-500">Genre: {movie.genre}</p>
                            <p className="text-gray-500">Release Year: {movie.releaseDate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
