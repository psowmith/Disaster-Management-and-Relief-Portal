import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(form);
      console.log('Registration Successful:', data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg border border-gray-300 shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Account</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded-md">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              required
            >
              <option value="">Select Role</option>
              <option value="volunteer">Volunteer</option>
              <option value="user">General User</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold shadow-md hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          Already have an account?{' '}
          <button
            onClick={redirectToLogin}
            className="text-blue-500 hover:underline font-semibold"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;