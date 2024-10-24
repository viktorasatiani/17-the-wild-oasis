import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
function UserSignup() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success('User Successfully signed, Please verify your  email');
    },
  });
  return { signUp, isLoading };
}

export default UserSignup;
