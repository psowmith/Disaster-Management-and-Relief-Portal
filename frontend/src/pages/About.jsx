//import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleRedirect = () => {
    navigate('/register'); // Redirect to the Register page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500">
        <h2 className="text-5xl font-extrabold text-purple-800 mb-6 text-center drop-shadow-md">
          About Us
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center mb-8">
          Welcome to the Disaster Management and Relief Funds Portal. Our mission is to provide
          real-time support, coordination, and transparency in disaster relief efforts. Through
          our platform, we connect communities, volunteers, and organizations to create an
          effective response system.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision */}
          <div className="bg-gradient-to-br from-purple-400 via-pink-300 to-red-300 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-purple-900 mb-2">Our Vision</h3>
            <p className="text-gray-800">
              A world where disaster response is swift, efficient, and inclusive.
            </p>
          </div>
          {/* Mission */}
          <div className="bg-gradient-to-br from-red-400 via-pink-300 to-purple-300 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-red-900 mb-2">Our Mission</h3>
            <p className="text-gray-800">
              To empower communities with tools for disaster preparedness and recovery.
            </p>
          </div>
        </div>
        {/* Features */}
        <div className="mt-8">
          <h3 className="text-3xl font-bold text-purple-800 mb-4 text-center">
            Features of Our Platform
          </h3>
          <ul className="space-y-4 text-gray-800 text-lg">
            <li className="flex items-center">
              <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-4 shadow-lg">
                1
              </span>
              Real-time disaster reporting and updates.
            </li>
            <li className="flex items-center">
              <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center mr-4 shadow-lg">
                2
              </span>
              Volunteer coordination and task assignment.
            </li>
            <li className="flex items-center">
              <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center mr-4 shadow-lg">
                3
              </span>
              Transparent fund collection and allocation.
            </li>
            <li className="flex items-center">
              <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-4 shadow-lg">
                4
              </span>
              Efficient resource distribution to affected areas.
            </li>
          </ul>
        </div>
        {/* Call to Action */}
        <div className="text-center mt-8">
          <button
            className="bg-purple-500 text-white px-8 py-4 rounded-full shadow-xl font-bold text-lg hover:bg-purple-600 transform hover:scale-105 transition duration-300"
            onClick={handleRedirect}
          >
            Get Involved
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
