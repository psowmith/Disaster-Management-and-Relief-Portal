//import React from 'react';
import { useNavigate } from 'react-router-dom';
import video from '../components/Untitled design.mp4';
const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleGetStarted = () => {
    navigate('/about'); // Redirect to the About page or any desired route
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
      />
      {/* Content Overlay */}
      <div className="relative bg-white bg-opacity-80 p-8 rounded-lg text-center shadow-lg z-10">
        <h1 className="text-5xl font-bold mb-4 text-purple-800">
          Welcome to Disaster Management
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Manage, report, and volunteer for disaster relief efforts seamlessly.
        </p>
        <button
          className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-purple-600 transition"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
      {/* Dark Overlay for Better Contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0" />
    </div>
  );
};

export default Home;
