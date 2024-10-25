import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('User has been updated');
    },
    onError: () => {
      toast.error(`There was some Error`);
    },
  });

  return { updateUser, isLoading };
}

export default useUpdateUser;
