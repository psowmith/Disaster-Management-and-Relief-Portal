// src/pages/user/components/SOSButton.jsx
//import React from 'react';

const SOSButton = () => {
  const handleSOSClick = () => {
    alert("SOS alert has been sent! Emergency services are on their way.");
  };

  return (
    <button
      onClick={handleSOSClick}
      className="bg-red-600 text-white py-4 px-8 rounded-full text-lg font-bold shadow-lg hover:bg-red-700 transition-all transform hover:scale-105"
    >
      Send SOS
    </button>
  );
};

export default SOSButton;
