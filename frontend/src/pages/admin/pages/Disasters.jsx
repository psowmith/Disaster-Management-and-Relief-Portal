import { useState, useEffect } from 'react';
import { fetchAllDisasterReports, deleteDisasterReport } from '../../../services/disasterService';
import EditDisaster from './EditDisaster'; // Import the EditDisaster modal component

const Disasters = () => {
  const [disasters, setDisasters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  // Fetch disasters on component mount
  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const data = await fetchAllDisasterReports();
        setDisasters(data);
      } catch (err) {
        console.error('Error fetching disaster reports:', err);
      }
    };
    fetchDisasters();
  }, []);

  // Handle delete disaster report
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this disaster report?')) {
      try {
        await deleteDisasterReport(id);
        setDisasters((prevDisasters) =>
          prevDisasters.filter((disaster) => disaster._id !== id)
        );
      } catch (err) {
        console.error('Error deleting disaster report:', err);
      }
    }
  };

  // Open modal for editing disaster
  const handleEdit = (disaster) => {
    setSelectedDisaster(disaster);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDisaster(null); // Reset selected disaster
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Disasters</h1>
      <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border px-6 py-3 text-left font-semibold">Image</th>
            <th className="border px-6 py-3 text-left font-semibold">Title</th>
            <th className="border px-6 py-3 text-left font-semibold">Location</th>
            <th className="border px-6 py-3 text-left font-semibold">Description</th>
            <th className="border px-6 py-3 text-left font-semibold">Status</th>
            <th className="border px-6 py-3 text-left font-semibold">Reported By</th>
            <th className="border px-6 py-3 text-left font-semibold">Username</th>
            <th className="border px-6 py-3 text-left font-semibold">Email</th>
            <th className="border px-6 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {disasters.length > 0 ? (
            disasters.map((disaster) => (
              <tr
                key={disaster._id}
                className="odd:bg-gray-100 even:bg-white hover:bg-blue-100 transition duration-200"
              >
                <td className="border px-6 py-4 text-gray-800">
                  <img
                    src={disaster.image || '/default-image.jpg'}
                    alt={disaster.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="border px-6 py-4 text-gray-800">{disaster.title}</td>
                <td className="border px-6 py-4 text-gray-800">{disaster.location}</td>
                <td className="border px-6 py-4 text-gray-800">
                  {disaster.description}
                </td>
                <td className="border px-6 py-4 text-gray-800">{disaster.status}</td>
                <td className="border px-6 py-4 text-gray-800">{disaster.reportedBy || 'N/A'}</td>
                <td className="border px-6 py-4 text-gray-800">{disaster.Username}</td>
                <td className="border px-6 py-4 text-gray-800">{disaster.email}</td>
                <td className="border px-6 py-4 text-center">
                  <button
                    onClick={() => handleEdit(disaster)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 shadow"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(disaster._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 shadow ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="border px-6 py-4 text-center text-gray-500">
                No disaster reports found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Disaster Modal */}
      <EditDisaster
        isOpen={isModalOpen}
        closeModal={closeModal}
        disasterId={selectedDisaster}
      />
    </div>
  );
};

export default Disasters;
