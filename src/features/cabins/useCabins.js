import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
  const { status, data: cabins } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });
  return { status, cabins };
}
