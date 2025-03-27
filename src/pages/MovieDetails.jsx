import React, { useState } from 'react';
import axios from 'axios';

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [poster, setPoster] = useState('');

  // Fetch all movies when the "Show Movies" button is clicked
  const fetchMovies = () => {
    axios
        .get('http://localhost:1337/api/movies')
        .then(response => {
          setMovies(response.data);
        })
        .catch(error => {
          console.error('Error fetching movies:', error);
        });
  };

  // Handle form submission to update a movie
  const handleSubmit = (event) => {
    event.preventDefault();

    const movieData = {
      title,
      genre,
      description,
      releaseYear,
      poster,
    };

    // Make a PATCH request to update the movie
    axios
        .patch(`http://localhost:1337/api/movies/${id}`, movieData)
        .then(response => {
          console.log('Movie updated successfully:', response.data);
          alert('Movie updated successfully!');
          fetchMovies(); // Refresh movie list after update
          setEditingMovie(null); // Clear editing state
        })
        .catch(error => {
          console.error('Error updating movie:', error);
          alert('Failed to update movie.');
        });
  };

  // Pre-fill the form for editing a movie
  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setId(movie.id);
    setTitle(movie.title);
    setGenre(movie.genre);
    setDescription(movie.description);
    setReleaseYear(movie.releaseYear);
    setPoster(movie.poster);
  };

  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
        <h1 className="text-3xl font-semibold mb-4">Movie Management</h1>
        <button
            onClick={fetchMovies}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-6"
        >
          Show Movies
        </button>

        {movies.length > 0 ? (
            <ul className="w-full max-w-3xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {movies.map((movie) => (
                  <li
                      key={movie.id}
                      className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                  >
                    <h3 className="text-xl font-semibold">{movie.title}</h3>
                    <p className="text-sm text-gray-500">{movie.genre}</p>
                    <p className="text-sm mt-2">{movie.description}</p>
                    <p className="text-sm mt-2 text-gray-400">Release Year: {movie.releaseYear}</p>
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="mt-4 rounded-md shadow-md"
                        width="100"
                    />
                    <button
                        onClick={() => handleEdit(movie)}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Edit
                    </button>
                  </li>
              ))}
            </ul>
        ) : (
            <p className="text-gray-500">No movies available.</p>
        )}

        {editingMovie && (
            <div className="w-full max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Edit Movie</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="movieId" className="block text-gray-700">Movie ID</label>
                  <input
                      type="text"
                      id="movieId"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700">Title</label>
                  <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="genre" className="block text-gray-700">Genre</label>
                  <input
                      type="text"
                      id="genre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      required
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700">Description</label>
                  <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="releaseYear" className="block text-gray-700">Release Year</label>
                  <input
                      type="number"
                      id="releaseYear"
                      value={releaseYear}
                      onChange={(e) => setReleaseYear(e.target.value)}
                      required
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="poster" className="block text-gray-700">Poster URL</label>
                  <input
                      type="text"
                      id="poster"
                      value={poster}
                      onChange={(e) => setPoster(e.target.value)}
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
                >
                  Update Movie
                </button>
              </form>
            </div>
        )}
      </div>
  );
};

export default MovieApp;
