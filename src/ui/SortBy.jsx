import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  return (
    <Select
      options={options}
      value={sortBy}
    />
  );
}

export default SortBy;
