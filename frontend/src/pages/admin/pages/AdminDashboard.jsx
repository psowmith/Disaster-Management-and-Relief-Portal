import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
        <Link
          to="/admin/users"
          className="p-4 bg-blue-500 text-white shadow-lg rounded-lg text-center transform hover:scale-105 hover:bg-blue-600 transition duration-300 border-4 border-transparent hover:border-blue-400 h-[80%] flex items-center justify-center"
        >
          <div>
            <h2 className="text-lg font-semibold">Manage Users</h2>
            <p className="text-sm">Add, Edit, or Delete user records</p>
          </div>
        </Link>
        <Link
          to="/admin/volunteers"
          className="p-4 bg-green-500 text-white shadow-lg rounded-lg text-center transform hover:scale-105 hover:bg-green-600 transition duration-300 border-4 border-transparent hover:border-green-400 h-[80%] flex items-center justify-center"
        >
          <div>
            <h2 className="text-lg font-semibold">Manage Volunteers</h2>
            <p className="text-sm">Add, Edit, or Delete volunteer records</p>
          </div>
        </Link>
        <Link
          to="/admin/disasters"
          className="p-4 bg-red-500 text-white shadow-lg rounded-lg text-center transform hover:scale-105 hover:bg-red-600 transition duration-300 border-4 border-transparent hover:border-red-400 h-[80%] flex items-center justify-center"
        >
          <div>
            <h2 className="text-lg font-semibold">Manage Disasters</h2>
            <p className="text-sm">Edit or Delete disaster records</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
