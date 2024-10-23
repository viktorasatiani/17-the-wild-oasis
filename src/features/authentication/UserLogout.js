import { useMutation } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
function UserLogout() {
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success('User has loged out successfully');
      navigate('/login');
    },
  });
  return { logout, isLoading };
}

export default UserLogout;
