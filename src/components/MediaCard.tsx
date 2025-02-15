import { useState } from 'react';
import NumberedCheckbox from './checkboxes/NumberedCheckbox';
import GifIcon from './icons/GifIcon';
import VideoIcon from './icons/VideoIcon';
import ExpandIcon from './icons/ExpandIcon';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addFileToSelectedFiles,
  removeFileFromSelectedFiles,
} from '../app/slices/mediaSlice';
import { FileInterface } from '../types/file';
import { selectSelectedMediaOrder } from '../app/selectors';

const MediaCard = ({
  id,
  extension,
  src,
  name,
  description,
}: FileInterface) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const order = useAppSelector(selectSelectedMediaOrder(id));
  const isSelected = order > 0;

  const handleHover = (state: boolean) => () => setIsHovered(state);
  const handleSelect = () =>
    isSelected
      ? dispatch(removeFileFromSelectedFiles(id))
      : dispatch(addFileToSelectedFiles(id));

  const isVideoOrGif = extension === 'mp4' || extension === 'gif';

  return (
    <div
      className='cursor-pointer'
      onMouseEnter={handleHover(true)}
      onMouseLeave={handleHover(false)}
      onClick={handleSelect}
    >
      <div className='h-[185px] p-1 flex justify-center items-center relative'>
        <div
          className={`w-full h-full rounded-lg absolute top-0 left-0 duration-200 transition-[background-color] ${
            isHovered && !isSelected
              ? 'bg-secondary-transparent-20 border-0'
              : ''
          } ${
            isSelected
              ? 'bg-primary-transparent-10 border-1 border-primary-100'
              : ''
          }`}
        ></div>
        {(isHovered || isSelected) && (
          <NumberedCheckbox
            className='absolute bottom-1 left-1'
            order={order}
          />
        )}
        {isHovered && !isSelected && (
          <ExpandIcon className='text-neutral-100 absolute top-1 left-1' />
        )}
        {isVideoOrGif && (
          <div className='absolute top-1/2 left-1/2 -translate-1/2 w-7 h-7 rounded-full bg-secondary-transparent-60 grid place-content-center pointer-events-none'>
            {extension === 'mp4' ? (
              <VideoIcon filled className='text-neutral-100' />
            ) : (
              <GifIcon className='text-neutral-100' />
            )}
          </div>
        )}
        <img
          src={src}
          alt={description}
          className='rounded-sm border-2 border-solid border-neutral-60 max-w-full max-h-full'
        />
      </div>
      <p className='h-7 flex justify-center items-center gap-2 text-xs text-secondary-80'>
        {name}
      </p>
    </div>
  );
};

export default MediaCard;
