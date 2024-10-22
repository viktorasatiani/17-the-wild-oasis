import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onMutate: (data) => {
      toast.success(`Booking ${data.id} has been deleted successfully`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(`Error deleting booking: ${error.message}`);
    },
  });
  return { deleteBooking, isDeletingBooking };
}

export default useDeleteBooking;
