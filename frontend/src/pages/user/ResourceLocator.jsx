// src/pages/user/ResourceLocator.jsx
//import React from 'react';
import Map from './components/Map';

const ResourceLocator = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Nearby Resources</h1>
      <Map />
    </div>
  );
};

export default ResourceLocator;
