// src/router/routes.js
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DisasterReport from '../pages/DisasterReport';
import VolunteerDashboard from '../pages/VolunteerDashboard';
import NotFound from '../pages/NotFound';
import UserDashboard from '../pages/user/UserDashboard';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/about',
    component: About,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/register',
    component: Register,
    exact: true,
  },
  {
    path: '/disaster-report',
    component: DisasterReport,
    exact: true,
    protected: true, // Indicates this route is protected
  },
  {
    path: '/volunteer-dashboard',
    component: VolunteerDashboard,
    exact: true,
    protected: true, // Indicates this route is protected
  },
  {
    path: '/user-dashboard',
    component: UserDashboard,
  },
  {
    path: '*', // Catch-all for unmatched routes
    component: NotFound,
  },
];

export default routes;
