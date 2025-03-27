// src/pages/user/EmergencyButton.jsx
//import React from 'react';
import SOSButton from './components/SOSButton';

const EmergencyButton = () => {
  return (
    <div className="p-6 bg-gray-100 flex items-center justify-center">
      <SOSButton />
    </div>
  );
};

export default EmergencyButton;
