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

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { data: booking, isLoading } = useBooking();
  // const booking = {};
  // const status = 'checked-in';
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

      {status === 'unconfirmed' && (
        <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
          CheckIn
        </Button>
      )}

      <ButtonGroup>
        <Button
          $variation='secondary'
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
