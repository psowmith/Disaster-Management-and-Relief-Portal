import PropTypes from 'prop-types';

const NotificationCard = ({ notification }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <p className="text-gray-800 font-medium mb-2">{notification}</p>
    </div>
  );
};

// Define the expected prop types
NotificationCard.propTypes = {
  notification: PropTypes.string.isRequired, // Expecting a single notification (string)
};

export default NotificationCard;
