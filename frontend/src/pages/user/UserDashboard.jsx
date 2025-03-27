import { useEffect, useState } from "react";
import NotificationCard from './components/NotificationCard';
import RequestAssistance from './RequestAssistance';
import ResourceLocator from './ResourceLocator';
import Feedback from './Feedback';
import EmergencyButton from './EmergencyButton';
import EducationalResources from './EducationalResources';
import { getUserProfile } from '../../services/authService';

const UserDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  // Fetch user profile and notifications
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(); 
        console.log("Fetched notifications:", userProfile.messages); // Debugging logs
        if (userProfile && Array.isArray(userProfile.messages)) {
          setNotifications(userProfile.messages); // Set the notifications array
        } else {
          console.warn("Messages are not in the expected format.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array to run only once when the component is mounted

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove authToken from localStorage
    window.location.reload(); // Reload the page
  };

  return (
    <div className="p-6 bg-[#2d545e] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-[#e1b382] tracking-wide font-serif">
          User Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      {/* Notifications Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#e1b382]">Notifications</h2>
        <div className="grid grid-cols-1 gap-6">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <NotificationCard key={index} notification={notification} />
            ))
          ) : (
            <p className="text-lg text-white">No new notifications</p>
          )}
        </div>
      </div>

      {/* Feature Sections */}
      <div>
        {/* Left Column */}
        <div className="grid grid-cols-1 grid-rows-1 gap-4 mb-4">
          <div className="bg-[#e1b382] shadow-lg rounded-lg p-6 text-[#12343b]">
            <h3 className="text-xl font-semibold mb-4">Request Assistance</h3>
            <RequestAssistance />
          </div>

          <div className="bg-[#c89666] shadow-lg rounded-lg p-6 text-[#12343b]">
            <h3 className="text-xl font-semibold mb-4">Resource Locator</h3>
            <ResourceLocator />
          </div>
        </div>

        {/* Right Column */}
        <div className="grid grid-cols-1 grid-rows-1 gap-4">
          <div className="bg-[#c89666] shadow-lg rounded-lg p-6 text-[#12343b]">
            <h3 className="text-xl font-semibold mb-4">Feedback</h3>
            <Feedback />
          </div>

          <div className="bg-[#e1b382] shadow-lg rounded-lg p-6 text-[#12343b]">
            <h3 className="text-xl font-semibold mb-4">Educational Resources</h3>
            <EducationalResources />
          </div>

          <div className="bg-[#2d545e] shadow-lg rounded-lg p-6 text-[#e1b382]">
            <h3 className="text-xl font-semibold mb-4">Emergency Button</h3>
            <EmergencyButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
