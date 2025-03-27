import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-100 h-full p-4">
      <ul>
        <li className="mb-4"><Link to="/dashboard" className="text-blue-500">Dashboard</Link></li>
        <li className="mb-4"><Link to="/users" className="text-blue-500">Users</Link></li>
        <li className="mb-4"><Link to="/volunteers" className="text-blue-500">Volunteers</Link></li>
        <li className="mb-4"><Link to="/disasters" className="text-blue-500">Disasters</Link></li>
      </ul>
    </div>
  );
};
export default Sidebar;