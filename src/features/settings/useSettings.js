import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

export function useSettings() {
  const { isLoading: isLoadingSettings, data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });
  return { isLoadingSettings, settings };
}
