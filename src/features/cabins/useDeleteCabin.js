import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending, mutate: deletingCabin } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success('Cabin has been deleted');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, deletingCabin };
}
