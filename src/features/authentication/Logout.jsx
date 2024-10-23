import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import UserLogout from './UserLogout';
import Spinner from '../../ui/Spinner';

function Logout() {
  const { logout, isLoading } = UserLogout();
  if (isLoading) return <Spinner />;
  return (
    <ButtonIcon
      disabled={isLoading}
      onClick={() => logout()}
    >
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
