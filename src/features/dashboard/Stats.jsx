import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import Stat from './Stat';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  const numBookings = bookings.length;
  const sales = confirmedStays.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupancy =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinsCount);
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title='Bookings'
        color='blue'
        value={numBookings}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title='Sales'
        color='green'
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        color='indigo'
        title='CHECK INS'
        value={checkins}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        color='yellow'
        title='occupancy rate'
        value={Math.round(occupancy * 100) + '%'}
      />
    </>
  );
}

export default Stats;
