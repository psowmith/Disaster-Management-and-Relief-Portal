import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService'; // Assuming you have this function

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email === 'admin@gmail.com' && form.password === 'admin@123') {
      localStorage.setItem('authToken', 'adminToken');
      localStorage.setItem('userId', 'adminId');
      navigate('/admin-dashboard');
      return;
    }

    try {
      const data = await login(form);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.id);

      if (data.role === 'user') {
        navigate('/user-dashboard');
      } else if (data.role === 'Volunteer') {
        navigate('/volunteer-dashboard');
      } else {
        navigate('/not-found');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Login</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded-md text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
