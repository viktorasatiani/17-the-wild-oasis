import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSettings() {
  const queryClinet = useQueryClient();
  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Settings has been updated');
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
  return { isUpdating, updateSetting };
}
