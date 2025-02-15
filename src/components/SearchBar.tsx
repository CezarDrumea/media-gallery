import MagnifyingGlass from './icons/MagnifyingGlass';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSearchQuery } from '../app/selectors';
import { setSearchQuery } from '../app/slices/mediaSlice';

const SearchBar = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();

  const searchQuery = useAppSelector(selectSearchQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <label className={`${className} relative`}>
      <input
        type='text'
        className='h-8 text-sm text-secondary-100 pl-3 pr-9 border-1 border-solid border-secondary-20 hover:border-secondary-100 rounded-md cursor-pointer duration-200 peer'
        placeholder='Search for media'
        value={searchQuery}
        onChange={handleChange}
      />
      <MagnifyingGlass className='absolute top-1/2 transform -translate-y-1/2 right-3 pointer-events-none text-secondary-20 peer-hover:text-secondary-100 duration-200' />
    </label>
  );
};

export default SearchBar;
