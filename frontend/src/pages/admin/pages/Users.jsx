import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../../services/authService'; // Assuming getAllUsers and deleteUser are implemented
import EditUser from './EditUser';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // State to manage selected user for editing
  const [showEditModal, setShowEditModal] = useState(false); // State to toggle modal visibility
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State to toggle delete success popup

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData); // Assuming getAllUsers returns the list of users
        setLoading(false);
      } catch (err) {
        setError('Error fetching users');
        setLoading(false);
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the selected user for editing
    setShowEditModal(true); // Show the modal
  };

  const handleDeleteClick = async (userId) => {
    try {
      await deleteUser(userId); // Call deleteUser API
      setShowDeletePopup(true); // Show success popup
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null); // Reset the selected user
    setShowEditModal(false); // Hide the modal
  };

  const handlePopupClose = () => {
    setShowDeletePopup(false); // Hide the popup
    window.location.reload(); // Refresh the page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h1>
      <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border px-6 py-3 text-left font-semibold">Name</th>
            <th className="border px-6 py-3 text-left font-semibold">Email</th>
            <th className="border px-6 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="odd:bg-gray-100 even:bg-white hover:bg-blue-100 transition duration-200">
              <td className="border px-6 py-4 text-gray-800">{user.name}</td>
              <td className="border px-6 py-4 text-gray-800">{user.email}</td>
              <td className="border px-6 py-4 text-center">
                <button
                  onClick={() => handleEditClick(user)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <EditUser
          user={selectedUser}
          onClose={handleCloseModal} // Close modal callback
          onUpdate={() => {
            handleCloseModal();
            // Optionally re-fetch users to refresh the list
          }}
        />
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-500">User Deleted</h2>
            <p className="text-gray-700 mb-4">The user has been successfully deleted.</p>
            <button
              onClick={handlePopupClose}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
