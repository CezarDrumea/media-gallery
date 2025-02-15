import FilterSelect from './selects/FilterSelect';

const Filters = () => {
  return (
    <div>
      <h2 className='pl-2 mb-4 text-secondary-100 text-sm font-medium'>
        Filters
      </h2>
      <FilterSelect />
    </div>
  );
};

export default Filters;
