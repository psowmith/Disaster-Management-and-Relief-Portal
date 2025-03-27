//import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
