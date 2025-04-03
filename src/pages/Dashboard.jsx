import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth.js';
import sanityClient from '@sanity/client';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    rating: '',
    releaseYear: '',
    poster: '',
  });
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({
    title: '',
    description: '',
    rating: '',
    genre: '',
    releaseYear: '',
    poster: '',
  });
  const [showMovies, setShowMovies] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState('');

  const { isAuthenticated, token, userRole, login, logout } = useAuthStore();

  // Sanity client setup
  const sanity = sanityClient({
    projectId: 'your-project-id',  // Replace with your project ID
    dataset: 'production',         // Replace with your dataset
    apiVersion: '2023-03-25',      // Use the correct API version
    token: 'your-sanity-api-token', // Replace with your sanity API token
    useCdn: false,
  });

  useEffect(() => {
    const fetchMovies = async () => {
      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }

      try {
        const response = await axios.get('https://critix-backend.onrender.com/api/movies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(response.data);
      } catch (err) {
        setError('Error fetching movies. Please try again.');
      }
    };

    fetchMovies();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload to Sanity
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError('No file selected.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      const image = reader.result;

      try {
        const uploadedAsset = await sanity.assets.upload('image', file, {
          filename: file.name,
        });
        setFormData((prevState) => ({
          ...prevState,
          poster: uploadedAsset.url, // Save the URL returned by Sanity
        }));
        setSuccessMessage('Image uploaded successfully!');
      } catch (err) {
        setError('Error uploading image. Please try again.');
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('No authentication token found. Please log in.');
      return;
    }

    if (userRole !== 'admin') {
      setError('Only admins can create movies.');
      return;
    }

    try {
      const response = await axios.post(
          'https://critix-backend.onrender.com/api/movies',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      setFormData({
        title: '',
        description: '',
        genre: '',
        rating: '',
        releaseYear: '',
        poster: '',
      });

      setSuccessMessage('Movie created successfully!');
      setError('');
      setIsModalOpen(false);
    } catch (err) {
      setError('Error creating movie. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleDelete = async () => {
    if (!token || !selectedMovie?._id) {
      setError('No authentication token or movie ID found. Please log in or select a movie to delete.');
      return;
    }

    if (userRole !== 'admin') {
      setError('Only admins can delete movies.');
      return;
    }

    try {
      const response = await axios.delete(
          `https://critix-backend.onrender.com/api/movies/${selectedMovie._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      setSuccessMessage('Movie deleted successfully!');
      setError('');
      setIsDeleteModalOpen(false);
      setSelectedMovie(null);
    } catch (err) {
      setError('Error deleting movie. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleEditClick = (movie) => {
    setSelectedMovie(movie);
    setUpdatedInfo({
      title: movie.title || '',
      description: movie.description || '',
      rating: movie.rating || '',
      genre: movie.genre || '',
      releaseYear: movie.releaseYear || '',
      poster: movie.poster || '',
    });
  };

  const handleUpdateMovie = async () => {
    if (!selectedMovie || !selectedMovie._id) {
      console.error('No movie selected or invalid movie ID.');
      return;
    }

    if (!token) {
      console.error('No JWT token found.');
      return;
    }

    if (userRole !== 'admin') {
      setError('Only admins can update movies.');
      return;
    }

    try {
      const response = await axios.patch(
          `https://critix-backend.onrender.com/api/movies/${selectedMovie._id}`,
          {
            title: updatedInfo.title,
            description: updatedInfo.description,
            rating: updatedInfo.rating,
            genre: updatedInfo.genre,
            releaseYear: updatedInfo.releaseYear,
            poster: updatedInfo.poster,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      setSuccessMessage('Movie updated successfully!');
      setError('');
      navigate('/');
    } catch (err) {
      setError('Error updating movie. Please try again.');
      setSuccessMessage('');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const toggleShowMovies = () => {
    setShowMovies((prevState) => !prevState);
  };

  return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <button onClick={toggleModal} className="mb-4 bg-black text-white p-2 rounded-md hover:bg-gray-600">
          Add Movie
        </button>
        <button onClick={toggleShowMovies} className="ml-5 bg-black text-white py-2 px-4 rounded mb-4 hover:bg-gray-600">
          {showMovies ? 'Hide Movies' : 'Show Movies'}
        </button>

        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className={`transition-all duration-500 ease-in-out ${isModalOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Create a Movie</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                  />
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                    Rating 1-5
                  </label>
                  <input
                      type="number"
                      id="rating"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                    Genre
                  </label>
                  <input
                      type="text"
                      id="genre"
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                  />
                </div>
                <div>
                  <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">
                    Release Year
                  </label>
                  <input
                      type="number"
                      id="releaseYear"
                      name="releaseYear"
                      value={formData.releaseYear}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                />
              </div>

              <div>
                <label htmlFor="poster" className="block text-sm font-medium text-gray-700">
                  Upload Poster Image
                </label>
                <input
                    type="file"
                    id="poster"
                    name="poster"
                    onChange={handleImageUpload}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                />
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-gray-600">
                Create Movie
              </button>
            </form>
            <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
        </div>

        <div className="container mx-auto p-4">
          {showMovies && (
              <div className="grid grid-cols-1 gap-4">
                {movies.map((movie) => (
                    <div key={movie._id} className="p-4 border rounded shadow-lg">
                      <h2
                          className="text-xl font-semibold cursor-pointer"
                          onClick={() => handleEditClick(movie)}
                      >
                        {movie.title}
                      </h2>
                    </div>
                ))}
              </div>
          )}

          {selectedMovie && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Edit Movie: {selectedMovie.title}</h2>
                <form onSubmit={handleUpdateMovie} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                          type="text"
                          id="title"
                          name="title"
                          value={updatedInfo.title}
                          onChange={(e) => setUpdatedInfo({ ...updatedInfo, title: e.target.value })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          required
                      />
                    </div>
                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                        Rating 1-5
                      </label>
                      <input
                          type="number"
                          id="rating"
                          name="rating"
                          value={updatedInfo.rating}
                          onChange={(e) => setUpdatedInfo({ ...updatedInfo, rating: e.target.value })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                        Genre
                      </label>
                      <input
                          type="text"
                          id="genre"
                          name="genre"
                          value={updatedInfo.genre}
                          onChange={(e) => setUpdatedInfo({ ...updatedInfo, genre: e.target.value })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          required
                      />
                    </div>

                    <div>
                      <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">
                        Release Year
                      </label>
                      <input
                          type="number"
                          id="releaseYear"
                          name="releaseYear"
                          value={updatedInfo.releaseYear}
                          onChange={(e) => setUpdatedInfo({ ...updatedInfo, releaseYear: e.target.value })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={updatedInfo.description}
                        onChange={(e) => setUpdatedInfo({ ...updatedInfo, description: e.target.value })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                  </div>

                  <div>
                    <label htmlFor="poster" className="block text-sm font-medium text-gray-700">
                      Poster URL
                    </label>
                    <input
                        type="url"
                        id="poster"
                        name="poster"
                        value={updatedInfo.poster}
                        onChange={(e) => setUpdatedInfo({ ...updatedInfo, poster: e.target.value })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                  </div>

                  <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-gray-600">
                    Update Movie
                  </button>
                </form>

                <button
                    onClick={toggleDeleteModal}
                    className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  Delete Movie
                </button>
              </div>
          )}
        </div>

        <div className={`transition-all duration-500 ease-in-out ${isDeleteModalOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this movie?</p>

            <div className="mt-4 flex justify-end">
              <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                  onClick={toggleDeleteModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
