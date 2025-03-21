import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
      <div>
        <h1>Welcome to the Movie App HOMEPAGE</h1>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Go to Dashboard</Link>
            </li>
            <li>
              <Link to="/movie/1">Go to Movie 1 Details</Link>
            </li>
            <li>
              <Link to="/movie/2">Go to Movie 2 Details</Link>
            </li>
          </ul>
        </nav>
      </div>
  );
}

export default Home;
