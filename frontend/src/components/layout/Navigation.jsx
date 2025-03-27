import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-gray-100 shadow p-4">
      <ul className="flex gap-4">
        <li>
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700 transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-blue-500 hover:text-blue-700 transition"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 transition"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
