
import PropTypes from 'prop-types'; // Import PropTypes
import { Link } from 'react-router-dom';

const VolunteerProfile = ({ volunteer }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{volunteer.name}</h2>
        <Link to="/volunteer-profile" className="text-blue-500 text-sm">
          Edit Profile
        </Link>
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Bio</h3>
        <p>{volunteer.profile.bio}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Skills</h3>
        <ul className="list-disc pl-5">
          {volunteer.profile.skills.map((skill, index) => (
            <li key={index} className="text-gray-700">{skill}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Current Volunteer Status</h3>
        <p className="text-gray-700">Available for volunteer work: {volunteer.available ? 'Yes' : 'No'}</p>
      </div>

      <div className="mt-4">
        <Link to="/volunteer-profile" className="p-2 bg-blue-500 text-white rounded-lg">
          View Full Profile
        </Link>
      </div>
    </div>
  );
};

// Add prop validation
VolunteerProfile.propTypes = {
  volunteer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      bio: PropTypes.string.isRequired,
      skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    available: PropTypes.bool.isRequired,
  }).isRequired,
};

export default VolunteerProfile;
