import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParmas] = useSearchParams();
  const filteredValue = searchParmas.get('status');
  const filter =
    !filteredValue || filteredValue === 'all'
      ? null
      : { field: 'status', value: filteredValue };
  const sortByValue = searchParmas.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByValue.split('-');
  const sortBy = !sortByValue ? null : { field, direction };

  const { data: bookings, status } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
  return { bookings, status };
}
