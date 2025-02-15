import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectSelectedMediaQuantity,
  selectTransformedFilteredMediaToSelectedMedia,
} from '../app/selectors';
import {
  deleteSelectedFiles,
  setSelectedFiles,
} from '../app/slices/mediaSlice';

import CubicCheckbox from '../components/checkboxes/CubicCheckbox';
import TrashBinIcon from '../components/icons/TrashBinIcon';
import SearchBar from '../components/SearchBar';
import FolderSelect from '../components/selects/FolderSelect';

const TopBar = () => {
  const dispatch = useAppDispatch();

  const selectedMediaQuantity = useAppSelector(selectSelectedMediaQuantity);

  const allFilteredMediaTransformedToSelectedMedia = useAppSelector(
    selectTransformedFilteredMediaToSelectedMedia
  );

  const areFilesSelected = selectedMediaQuantity > 0;

  const toggleSelectAll = () =>
    dispatch(
      setSelectedFiles(
        areFilesSelected ? {} : allFilteredMediaTransformedToSelectedMedia
      )
    );

  const handleDelete = () => dispatch(deleteSelectedFiles());

  return (
    <header className='col-span-1 pl-2'>
      <div className='flex items-center h-full'>
        <CubicCheckbox
          className='mr-2'
          onToggleSelectAll={toggleSelectAll}
          checked={areFilesSelected}
        />
        <span className='text-sm text-secondary-60 mr-6'>
          {selectedMediaQuantity} selected
        </span>
        {areFilesSelected && (
          <>
            <FolderSelect className='mr-6' />
            <div
              onClick={handleDelete}
              className='mr-6 h-8 w-8 flex justify-center items-center border-1 border-solid border-secondary-20 hover:border-secondary-100 text-secondary-20 hover:text-secondary-100 rounded-md cursor-pointer duration-200'
            >
              <TrashBinIcon />
            </div>
          </>
        )}
        <SearchBar />
      </div>
      <hr className='bg-secondary-10 h-px mr-2 border-0' />
    </header>
  );
};

export default TopBar;
