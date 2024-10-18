import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get('status');
  const filter =
    !filteredValue || filteredValue === 'all'
      ? null
      : { field: 'status', value: filteredValue };
  const sortByValue = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByValue.split('-');
  const sortBy = !sortByValue ? null : { field, direction };

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { data, status, count } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  return { data, status, count };
}
