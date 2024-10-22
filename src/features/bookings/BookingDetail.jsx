import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import { useMoveBack } from '../../hooks/useMoveBack';
import useBooking from './useBooking';
import { useNavigate } from 'react-router';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import useCheckout from '../check-in-out/useCheckout';
import { useState } from 'react';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import useDeleteBooking from './useDeleteBooking';
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const { checkOut } = useCheckout();
  const { data: booking, isLoading } = useBooking();
  console.log(booking);
  const { id: bookingId, status } = booking || {};

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };
  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            CheckIn
          </Button>
        )}

        {status === 'checked-in' && (
          <Button onClick={() => checkOut(bookingId)}>CheckOut</Button>
        )}
        <Button
          $variations='danger'
          onClick={() => setIsOpenModal((modal) => !modal)}
        >
          Delete
        </Button>
        <Button
          $variations='secondary'
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
      {isOpenModal && (
        <Modal onCloseModal={() => setIsOpenModal(false)}>
          <ConfirmDelete
            resourceName={`Booking of ${booking.guests.fullName}`}
            onConfirm={() => {
              deleteBooking(bookingId);
              navigate(-1);
            }}
            disabled={isDeletingBooking}
            onCloseDeleteModal={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default BookingDetail;
