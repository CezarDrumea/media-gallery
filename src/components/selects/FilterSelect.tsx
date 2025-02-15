import { useState } from 'react';
import ArrowIcon from '../icons/ArrowIcon';
import CheckCheckbox from '../checkboxes/CheckCheckbox';
import Filter from '../Filter';
import GifIcon from '../icons/GifIcon';
import PictureIcon from '../icons/PictureIcon';
import VideoIcon from '../icons/VideoIcon';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleAllExtensionFilters } from '../../app/slices/mediaSlice';
import {
  selectAreAllExtensionFiltersChecked,
  selectMediaTypeQuantities,
} from '../../app/selectors';

const FilterSelect = () => {
  const dispatch = useAppDispatch();

  const areAllExtensionFiltersChecked = useAppSelector(
    selectAreAllExtensionFiltersChecked
  );

  const { jpgQuantity, gifQuantity, mp4Quantity } = useAppSelector(
    selectMediaTypeQuantities
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => setIsOpen(!isOpen);

  const handleToggleAllExtensionFilters = () =>
    dispatch(toggleAllExtensionFilters());

  return (
    <div className='flex flex-col gap-1'>
      <div className='h-7 pl-2 pr-2 flex items-center'>
        <div
          onClick={handleIsOpen}
          className='flex items-center cursor-pointer text-secondary-60 hover:text-secondary-100 duration-200'
        >
          <span className='mr-1.5 text-xs'>Media type</span>
          <ArrowIcon down={isOpen} />
        </div>
        <CheckCheckbox
          className='ml-auto'
          checked={areAllExtensionFiltersChecked}
          onCheck={handleToggleAllExtensionFilters}
        />
      </div>
      {isOpen && (
        <>
          <Filter
            name='Images'
            quantity={jpgQuantity}
            Icon={PictureIcon}
            extension='jpg'
          />
          <Filter
            name='Videos'
            quantity={mp4Quantity}
            Icon={VideoIcon}
            extension='mp4'
          />
          <Filter
            name='GIFs'
            quantity={gifQuantity}
            Icon={GifIcon}
            extension='gif'
          />
        </>
      )}
    </div>
  );
};

export default FilterSelect;
