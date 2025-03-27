// src/pages/user/EducationalResources.jsx
//import React from 'react';

// Sample data for educational resources
const resources = [
  {
    id: 1,
    title: 'Disaster Preparedness Guide',
    description: 'A comprehensive guide on preparing for various natural disasters.',
    link: 'https://example.com/disaster-preparedness-guide',
    type: 'pdf',
  },
  {
    id: 2,
    title: 'Emergency Response Procedures',
    description: 'Step-by-step procedures for responding to disasters effectively.',
    link: 'https://example.com/emergency-response-procedures',
    type: 'video',
  },
  {
    id: 3,
    title: 'First Aid for Disasters',
    description: 'Learn the basics of first aid that can save lives in disaster situations.',
    link: 'https://example.com/first-aid-for-disasters',
    type: 'article',
  },
  {
    id: 4,
    title: 'Search and Rescue Operations',
    description: 'An overview of the search and rescue operations during a disaster.',
    link: 'https://example.com/search-and-rescue-operations',
    type: 'pdf',
  },
];

const EducationalResources = () => {
  return (
    <div className="educational-resources-container">
      <h1 className="text-2xl font-bold mb-4">Educational Resources</h1>
      <p className="mb-6">Browse through the following resources to learn about disaster preparedness and response.</p>
      <div className="resource-list">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-card bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
            <h2 className="text-xl font-semibold">{resource.title}</h2>
            <p className="text-gray-600 mb-2">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {resource.type === 'pdf' ? 'Download PDF' : resource.type === 'video' ? 'Watch Video' : 'Read Article'}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationalResources;
