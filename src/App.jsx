import { Navigate, RouterProvider } from 'react-router';
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Booking from './pages/Booking';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

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
      { path: 'bookings/:bookingId', element: <Booking /> },
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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition='bottom-left'
      />
      <GlobalStyles />
      <RouterProvider router={router} />
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
