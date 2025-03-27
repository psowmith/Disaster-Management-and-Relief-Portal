//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './router/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import UserDashboard from './pages/user/UserDashboard';
import VolunteerProfilePage from './pages/volunteer/VolunteerProfilePage';
import DisasterDetails from './pages/volunteer/components/DisasterDetails';
import AdminDashboard from './pages/admin/pages/AdminDashboard';
import Disasters from './pages/admin/pages/Disasters';
import Users from './pages/admin/pages/Users';
import Volunteers from './pages/admin/pages/Volunteers';
// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
 import DisasterReport from './pages/DisasterReport';
import VolunteerDashboard from './pages/volunteer/VolunteerDashboard';
import NotFound from './pages/NotFound';

// Import styles
import './App.css';

const App = () => {
  return (
    // <AuthProvider>
        <Router>
          <div className="app-container">
            {/* Header Component */}
            <Header />

            <div className="main-content">
              {/* Sidebar Component */}
              <Sidebar />

              {/* Main Routes */}
              <div className="page-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/disaster-report" element={
                    <ProtectedRoute>
                      <DisasterReport />
                    </ProtectedRoute>
                  } />
                  <Route path="/user-dashboard" element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/volunteer-dashboard" element={
                    <ProtectedRoute>
                      <VolunteerDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/volunteer-profile" element={
                    <ProtectedRoute>
                      <VolunteerProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/disaster/:id" element={
                    <ProtectedRoute>
                      <DisasterDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin-dashboard" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/admin/users" element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/volunteers" element={
                    <ProtectedRoute>
                      <Volunteers />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/disasters" element={
                    <ProtectedRoute>
                      <Disasters />
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
            </div>

            {/* Footer Component */}
            <Footer />
          </div>
        </Router>
    // </AuthProvider>
  );
};

export default App;
