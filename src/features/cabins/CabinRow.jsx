import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useDeleteCabin } from './useDeleteCabin';
import { HiOutlineSquare2Stack } from 'react-icons/hi2';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import EditCabinForm from './EditCabinForm';
import { useState } from 'react';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import { useDarkMode } from '../../context/useDarkMode';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [isOpenEditModal, setIsOpenEditModal] = useState();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState();
  const { createCabin, isCreating } = useCreateCabin();
  const { isDark } = useDarkMode();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;
  function onCloseEditModal() {
    isOpenEditModal && setIsOpenEditModal(false);
  }
  function onCloseDeleteModal() {
    isOpenDeleteModal && setIsOpenDeleteModal(false);
  }
  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  }
  const { isPending, deletingCabin } = useDeleteCabin();
  return (
    <>
      <IconContext.Provider
        value={{
          color: isDark ? 'var(--color-grey-100)' : 'var(--color-grey-700)',
        }}
      >
        <TableRow role='row'>
          <Img
            src={image}
            alt="Cabin's image"
          />
          <Cabin>{name}</Cabin>
          <div>Fits up to {maxCapacity} guests</div>
          <Price>{formatCurrency(regularPrice)}</Price>
          {discount ? (
            <Discount>{formatCurrency(discount)}</Discount>
          ) : (
            <span>-</span>
          )}
          <div>
            <button
              onClick={handleDuplicate}
              disabled={isCreating}
            >
              <HiOutlineSquare2Stack />
            </button>
            <button onClick={() => setIsOpenEditModal((show) => !show)}>
              <HiOutlinePencil />
            </button>
            <button onClick={() => setIsOpenDeleteModal((show) => !show)}>
              <HiOutlineTrash />
            </button>
          </div>
        </TableRow>
        {isOpenEditModal && (
          <Modal onCloseEditModal={onCloseEditModal}>
            <EditCabinForm
              cabinToEdit={cabin}
              onCloseEditModal={onCloseEditModal}
            />
          </Modal>
        )}
        {isOpenDeleteModal && (
          <Modal>
            <ConfirmDelete
              resourceName={name}
              onConfirm={() => deletingCabin(cabinId)}
              disabled={isPending}
              onCloseDeleteModal={onCloseDeleteModal}
            />
          </Modal>
        )}
      </IconContext.Provider>
    </>
  );
}

export default CabinRow;
