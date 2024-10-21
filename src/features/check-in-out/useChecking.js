import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function useChecking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checking, isLoading: isChecking } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
      }),
    onSuccess: (data) => {
      console.log(data);

      toast.success(`Booking ${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: (error) => {
      toast.error(`There was an Error while Checkin: ${error.message}`);
    },
  });
  return { checking, isChecking };
}

export default useChecking;
