import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import DisasterGrid from './components/DisasterGrid';
import FeedbackForm from './components/FeedbackForm';
import { getVolunteerProfile } from '../../services/authService'; // Fetch volunteer profile

const VolunteerDashboard = () => {
  const [volunteer, setVolunteer] = useState(null); // Volunteer state to store data
  const [isLoading, setIsLoading] = useState(true); // Loading state to handle async fetch

  // Fetch volunteer profile
  useEffect(() => {
    const fetchVolunteerProfile = async () => {
      try {
        const data = await getVolunteerProfile(); // Fetch volunteer profile data
        setVolunteer(data); // Set volunteer data in state
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching volunteer profile:', error);
        setIsLoading(false); // Handle error case
      }
    };

    fetchVolunteerProfile(); // Call the function to fetch data
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear auth token
    window.location.reload(); // Reload the page after logging out
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/259880/pexels-photo-259880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="container mx-auto p-6">
        <header className="flex justify-between items-center py-4">
          <h1 className="text-4xl font-extrabold text-shadow-lg">Volunteer Dashboard</h1>
          <div className="relative flex space-x-4">
            <Link
              to="/volunteer-profile"
              className="p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="p-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Display volunteer's name or profile information */}
        <div className="mb-6 p-6 bg-gradient-to-br from-[#31473A] to-[#EDF4F2] text-gray-800 rounded-lg shadow-md bg-opacity-80">
          <h2 className="text-3xl font-bold mb-2">Welcome, {volunteer.name}!</h2>
          <p className="text-lg mb-2">
            <span className="font-semibold">Bio : </span>{' '}
            {volunteer.assignedDisaster || 'None'}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Skills:</span>{' '}
            {volunteer.skills ? volunteer.skills.join(', ') : 'N/A'}
          </p>
        </div>

        <div className="w-full space-y-6">
          {/* DisasterGrid */}
          <div className="w-full">
            <DisasterGrid />
          </div>
          {/* FeedbackForm placed below DisasterGrid */}
          <div className="w-full">
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
