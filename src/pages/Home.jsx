import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Welcome to the Movie App HOMEPAGE</h1>
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/login"
                            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Go to LOGIN
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard"
                            className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Go to Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/dashboard"
                            className="inline-block px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                        >
                            Go to ADMIN Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/movie/2"
                            className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Go to Movie 2 Details
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;
