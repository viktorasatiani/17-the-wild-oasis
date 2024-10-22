import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isPending: isCheckingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: 'checked-out' }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(`There was an Error while Checkin: ${error.message}`);
    },
  });

  return { checkOut, isCheckingout };
}

export default useCheckout;
