import { Navigate, Router, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Account from './pages/Account';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Users from './pages/Users';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
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
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/users',
        element: <Users />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);
function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
