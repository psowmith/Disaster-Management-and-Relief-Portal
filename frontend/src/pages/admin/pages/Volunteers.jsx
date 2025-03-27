import { useState, useEffect } from 'react';
import { getVolunteers, deleteVolunteer } from '../../../services/volunteerService'; // Assuming these services exist

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);

  // Fetch volunteers on component mount
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const data = await getVolunteers();
        setVolunteers(data);
      } catch (err) {
        console.error('Error fetching volunteers:', err);
      }
    };
    fetchVolunteers();
  }, []);

  // Handle delete volunteer
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this volunteer?')) {
      try {
        await deleteVolunteer(id); // Call delete service
        setVolunteers((prevVolunteers) =>
          prevVolunteers.filter((volunteer) => volunteer._id !== id)
        ); // Update UI
      } catch (err) {
        console.error('Error deleting volunteer:', err);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Volunteers</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 transition duration-300 shadow">
        Add Volunteer
      </button>
      <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="border px-6 py-3 text-left font-semibold">Name</th>
            <th className="border px-6 py-3 text-left font-semibold">Email</th>
            <th className="border px-6 py-3 text-left font-semibold">Role</th>
            <th className="border px-6 py-3 text-left font-semibold">Skills</th>
            <th className="border px-6 py-3 text-left font-semibold">Assigned Disaster</th>
            <th className="border px-6 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.length > 0 ? (
            volunteers.map((volunteer) => (
              <tr
                key={volunteer._id}
                className="odd:bg-gray-100 even:bg-white hover:bg-green-100 transition duration-200"
              >
                <td className="border px-6 py-4 text-gray-800">{volunteer.name}</td>
                <td className="border px-6 py-4 text-gray-800">{volunteer.email || 'N/A'}</td>
                <td className="border px-6 py-4 text-gray-800">{volunteer.role}</td>
                <td className="border px-6 py-4 text-gray-800">
                  {Array.isArray(volunteer.skills) && volunteer.skills.length > 0
                    ? volunteer.skills.join(', ')
                    : 'None'}
                </td>
                <td className="border px-6 py-4 text-gray-800">
                  {volunteer.assignedDisaster || 'None'}
                </td>
                <td className="border px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(volunteer._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border px-6 py-4 text-center text-gray-500">
                No volunteers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Volunteers;
