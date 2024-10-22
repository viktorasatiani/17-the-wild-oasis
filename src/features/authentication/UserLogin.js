import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function UserLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      toast.success('Successfully Loged in');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(`There was some error with Log in ${error}`);
    },
  });

  return { login, isPending };
}

export default UserLogin;
