import { Navigate, Router, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Account from './pages/Account';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Users from './pages/Users';
import PageNotFound from './pages/PageNotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Navigate
        replace
        to='/dashboard'
      />
    ),
    index: true,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/account',
    element: <Account />,
  },
  {
    path: '/bookings',
    element: <Bookings />,
  },
  {
    path: '/cabins',
    element: <Cabins />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
