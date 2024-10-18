import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  // Filter
  const filteredValue = searchParams.get('status');
  const filter =
    !filteredValue || filteredValue === 'all'
      ? null
      : { field: 'status', value: filteredValue };

  // Sorting
  const sortByValue = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByValue.split('-');
  const sortBy = !sortByValue ? null : { field, direction };

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  // Query
  const { data: { bookings, count } = {}, status } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const totalPages = count / PAGE_SIZE;

  // Pre-Fetch
  if (page < totalPages)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { bookings, status, count };
}
