import { useEffect } from 'react';
import useUser from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // Get authenticated user
  const { user, isLoading, isAuthenticated } = useUser();

  // check if its  authenticated / if not redirect to /login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isAuthenticated, navigate, isLoading]
  );

  console.log(isAuthenticated);

  //render spinner if is loading
  if (isLoading) return <Spinner />;
  // if is authenticated enter
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
