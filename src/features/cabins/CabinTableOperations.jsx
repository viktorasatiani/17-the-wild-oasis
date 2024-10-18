import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No Discount' },
          { value: 'with-discount', label: 'With Discount' },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort By name A-Z' },
          { value: 'name-desc', label: 'Sort By name Z-A' },
          { value: 'regularPrice-asc', label: 'Sort By Price (low first)' },
          { value: 'regularPrice-desc', label: 'Sort By Price (high first)' },
          { value: 'maxCapacity-asc', label: 'Sort By Capacity (0-9)' },
          { value: 'maxCapacity-desc', label: 'Sort By Capacity (9-0)' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
