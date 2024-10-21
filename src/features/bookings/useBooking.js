import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router';

function useBooking() {
  const { bookingId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { data, isLoading };
}

export default useBooking;
