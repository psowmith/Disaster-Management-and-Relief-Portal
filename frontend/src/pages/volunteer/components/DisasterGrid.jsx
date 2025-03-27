import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDisasterReports } from '../../../services/disasterService'; // Fetch function for API call

const DisasterGrid = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch disasters from the backend
    const fetchDisasters = async () => {
      try {
        const data = await fetchDisasterReports();
        setDisasters(data); // Assuming the data is an array of disaster objects
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch disaster reports. Please try again.');
        setLoading(false);
        console.log(err);
      }
    };

    fetchDisasters();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {disasters.map((disaster) => (
        <Link
          to={`/disaster/${disaster._id}`}
          key={disaster._id}
          className="block rounded-lg shadow-md p-6 transform transition-transform hover:scale-105 hover:shadow-xl bg-gradient-to-br from-[#330000] via-[#73605B] to-[#D09683] text-white"
        >
          <img 
            src={disaster.image} 
            alt={disaster.title} 
            className="w-full h-40 object-cover rounded-lg mb-4" 
            
          />
          <h3 className="text-lg font-semibold mb-2 tracking-wide">
            {disaster.title}
          </h3>
          <p className="text-sm leading-relaxed mb-3">
            {disaster.description}
          </p>
          <p className="text-xs mt-2 italic text-gray-200">
            <span className="font-medium text-gray-100">Location:</span> {disaster.location}
          </p>
          <p className="text-xs italic text-gray-200">
            <span className="font-medium text-gray-100">Status:</span> {disaster.status}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default DisasterGrid;
