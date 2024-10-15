import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import CabinTable from './CabinTable';
import styled from 'styled-components';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState();
  const [isOpenTable, setIsOpenTable] = useState();
  function onCloseModal() {
    isOpenModal && setIsOpenModal(false);
  }
  function onCloseTable() {
    isOpenTable && setIsOpenTable(false);
  }
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
      {isOpenModal && (
        <Modal onCloseModal={onCloseModal}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
      {isOpenTable && (
        <Modal onCloseTable={onCloseTable}>
          <CabinTable />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
