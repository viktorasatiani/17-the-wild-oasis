import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCabin as editCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => editCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin has been Updated');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditing };
}
