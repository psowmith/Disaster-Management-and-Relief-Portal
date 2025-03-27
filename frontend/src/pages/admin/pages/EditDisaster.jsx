import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchDisasterReportById, updateDisasterReport } from '../../../services/disasterService';

const EditDisaster = ({ isOpen, closeModal, disasterId }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    status: '',
    image: '',
    reportedBy: '',
    email: '',
    Username: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  useEffect(() => {
    const getDisasterData = async () => {
      if (disasterId) {
        try {
          const disaster = await fetchDisasterReportById(disasterId._id);
          setFormData({
            title: disaster.title || '',
            location: disaster.location || '',
            description: disaster.description || '',
            status: disaster.status || '',
            image: disaster.image || '',
            reportedBy: disaster.reportedBy || '',
            email: disaster.email || '',
            Username: disaster.Username || '',
          });
        } catch (error) {
          console.error('Error fetching disaster data:', error);
        }
      }
    };

    getDisasterData();
  }, [disasterId]);

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle update form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submission
    try {
      const updatedDisaster = await updateDisasterReport(disasterId._id, formData);
      console.log('Disaster updated:', updatedDisaster);
      closeModal(); // Close modal after successful update
    } catch (err) {
      console.error('Error updating disaster:', err);
    } finally {
      setIsSubmitting(false); // Reset the submission state
    }
  };

  if (!isOpen) {
    return null; // Ensure the modal only renders if open
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-auto">
        <button
          className="absolute top-4 right-4 text-gray-600 text-xl"
          onClick={closeModal}
        >
          &#x2715; {/* 'X' button */}
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Disaster Report</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
              placeholder="Enter location"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
              placeholder="Enter description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
            >
              <option value="reported">Reported</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
              placeholder="Enter image URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Reported By</label>
            <input
              type="text"
              name="reportedBy"
              value={formData.reportedBy}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
              placeholder="Enter reporter's name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
              placeholder="Enter username"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting} // Disable the button during submission
              className={`bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span>Saving...</span> // Loading text when submitting
              ) : (
                <span>Save Changes</span> // Normal text
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditDisaster.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  disasterId: PropTypes.string.isRequired, // ID of the disaster to fetch
};

export default EditDisaster;
