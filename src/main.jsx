// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App';

// Create a root element where React will render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
