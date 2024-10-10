import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';
import { createContext, useState } from 'react';

const CabinsContext = createContext();
function Cabins() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenTable, setIsOpenTable] = useState(false);
  return (
    <>
      <CabinsContext.Provider
        value={{ isOpenModal, setIsOpenModal, isOpenTable, setIsOpenTable }}
      >
        <Row type='horizontal'>
          <Heading as='h1'>All cabins</Heading>
          <p>Filter / Sort</p>
        </Row>
        <Row>
          <CabinTable />
          <AddCabin />
        </Row>
      </CabinsContext.Provider>
    </>
  );
}

export default Cabins;
export { CabinsContext };
