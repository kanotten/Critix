import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        releaseYear: '',
        poster: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for add movie modal visibility
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete movie modal visibility
    const [movieIdToDelete, setMovieIdToDelete] = useState(''); // State for movie ID to delete

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission for adding movie
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Retrieve JWT token from localStorage
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            setError('No authentication token found. Please log in.');
            return;
        }

        try {
            const response = await axios.post(
                'https://critix-backend.onrender.com/api/movies',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
                    },
                }
            );

            // Clear form after successful submission
            setFormData({
                title: '',
                description: '',
                genre: '',
                releaseYear: '',
                poster: '',
            });

            setSuccessMessage('Movie created successfully!');
            setError('');
            setIsModalOpen(false); // Close the modal after successful form submission
        } catch (err) {
            setError('Error creating movie. Please try again.');
            setSuccessMessage('');
        }
    };

    // Handle movie deletion
    const handleDelete = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError('No authentication token found. Please log in.');
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:1337/api/movies/${movieIdToDelete}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
                    },
                }
            );
            setSuccessMessage('Movie deleted successfully!');
            setError('');
            setIsDeleteModalOpen(false); // Close the delete modal after successful deletion
        } catch (err) {
            setError('Error deleting movie. Please try again.');
            setSuccessMessage('');
        }
    };

    // Toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Toggle delete modal visibility
    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    // Handle input change for movie ID to delete
    const handleDeleteInputChange = (e) => {
        setMovieIdToDelete(e.target.value);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <button>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    HOME
                </Link>
            </button>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <button
                onClick={toggleModal}
                className="mb-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                Add Movie
            </button>

            <button
                onClick={toggleDeleteModal}
                className="mb-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
                Delete Movie
            </button>

            {successMessage && (
                <div className="text-green-500 mb-4">{successMessage}</div>
            )}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Add Movie Modal */}
            <div
                className={`transition-all duration-500 ease-in-out ${
                    isModalOpen ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden`}
            >
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                    <h2 className="text-2xl font-bold mb-4">Create a Movie</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        <div>
                            <label htmlFor="poster" className="block text-sm font-medium text-gray-700">
                                Poster URL
                            </label>
                            <input
                                type="url"
                                id="poster"
                                name="poster"
                                value={formData.poster}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                            Create Movie
                        </button>
                    </form>

                    <button
                        onClick={toggleModal}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>
            </div>

            {/* Delete Movie Modal */}
            <div
                className={`transition-all duration-500 ease-in-out ${
                    isDeleteModalOpen ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden`}
            >
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                    <h2 className="text-2xl font-bold mb-4">Delete Movie</h2>
                    <p>Enter the movie ID to delete:</p>
                    <input
                        type="text"
                        value={movieIdToDelete}
                        onChange={handleDeleteInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Movie ID"
                    />
                    <button
                        onClick={handleDelete}
                        className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 mt-4"
                    >
                        Delete Movie
                    </button>
                    <button
                        onClick={toggleDeleteModal}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
