import { useContext } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import { CabinsContext } from '../../pages/Cabins';
import CabinTable from './CabinTable';
import styled from 'styled-components';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function AddCabin() {
  const { isOpenModal, setIsOpenModal, isOpenTable, setIsOpenTable } =
    useContext(CabinsContext);

  return (
    <div>
      <StyledButtonContainer>
        <Button onClick={() => setIsOpenModal((hidden) => !hidden)}>
          {isOpenModal ? 'Hide Form' : 'Add new cabin'}
        </Button>
        <Button onClick={() => setIsOpenTable((hidden) => !hidden)}>
          {isOpenTable ? 'Hide Tables' : 'Show Tables'}
        </Button>
      </StyledButtonContainer>
      {isOpenModal ||
        (isOpenTable && (
          <Modal
            onClose={() => {
              isOpenModal && setIsOpenModal(false);
              isOpenTable && setIsOpenTable(false);
            }}
          >
            {isOpenModal ? (
              <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
            ) : (
              <CabinTable />
            )}
          </Modal>
        ))}
    </div>
  );
}

export default AddCabin;
