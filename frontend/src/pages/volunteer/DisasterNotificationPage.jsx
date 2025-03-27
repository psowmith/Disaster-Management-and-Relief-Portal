import { useState } from 'react';
import PropTypes from 'prop-types';

const DisasterNotificationPage = ({ match }) => {
  const [notification, setNotification] = useState('');
  const disasterDetails = {
    1: 'Search and Rescue Operations: Volunteers often assist in locating and rescuing victims trapped in rubble, floodwaters, or other dangerous conditions.',
    2: 'Disaster Relief Distribution: Volunteers help in distributing food, water, clothing, and other essential supplies.',
    3: 'Shelter Assistance: Volunteers set up, manage, and assist in operating shelters for displaced individuals.',
    4: 'Medical Assistance: Volunteers may assist in providing first aid and organizing medical supplies.',
    5: 'Logistics and Communication: Volunteers help coordinate supplies and assist with emergency communication.',
    6: 'Emotional Support: Volunteers trained in psychological first aid provide counseling and emotional support.',
  };

  const disasterId = match.params.id;
  const disasterInfo = disasterDetails[disasterId];

  const handleNotificationChange = (e) => {
    setNotification(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">{disasterInfo}</h2>
      <textarea
        value={notification}
        onChange={handleNotificationChange}
        className="w-full p-2 mt-4"
        placeholder="Add your notification here"
      />
      <button className="p-2 bg-green-500 text-white mt-4">Add Notification</button>
    </div>
  );
};

// Add prop-types validation for `match`
DisasterNotificationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired, // Assuming ID is a string
    }).isRequired,
  }).isRequired,
};

export default DisasterNotificationPage;
