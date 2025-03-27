//import React from 'react';
import PropTypes from 'prop-types';

const ResourceCard = ({ resource }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
      <h2 className="text-lg font-bold text-gray-800">{resource.name}</h2>
      <p className="text-sm text-gray-600 mt-1">{resource.type}</p>
      <p className="text-sm text-gray-600 mt-1">
        Location: {resource.location}
      </p>
      <p className="text-sm text-gray-600 mt-1">Contact: {resource.contact}</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition-colors"
        onClick={() => alert(`Contacting ${resource.name}...`)}
      >
        Contact
      </button>
    </div>
  );
};

// Define prop types for validation
ResourceCard.propTypes = {
  resource: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResourceCard;
