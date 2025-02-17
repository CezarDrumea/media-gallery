import React, { useRef, useState } from 'react';
import NumberedCheckbox from './checkboxes/NumberedCheckbox';
import GifIcon from './icons/GifIcon';
import VideoIcon from './icons/VideoIcon';
import ExpandIcon from './icons/ExpandIcon';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addFileToSelectedFiles,
  removeFileFromSelectedFiles,
  renameFile,
} from '../app/slices/mediaSlice';
import { FileInterface } from '../types/file';
import { selectEditedName, selectSelectedMediaOrder } from '../app/selectors';
import EditIcon from './icons/EditIcon';

interface MediaCardInterface extends FileInterface {
  onOpenModal: (
    src: string,
    description: string
  ) => (e: React.MouseEvent) => void;
}

const MediaCard = ({
  id,
  extension,
  src,
  name,
  description,
  onOpenModal,
}: MediaCardInterface) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localName, setLocalName] = useState(name);

  const mediaRef = useRef<HTMLImageElement>(null);

  const order = useAppSelector(selectSelectedMediaOrder(id));
  const isSelected = order > 0;

  const editedName = useAppSelector(selectEditedName(id));

  const handleHover = (state: boolean) => () => setIsHovered(state);
  const handleSelect = () =>
    isSelected
      ? dispatch(removeFileFromSelectedFiles(id))
      : dispatch(addFileToSelectedFiles(id));
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLocalName(e.target.value);

  const handleFinishEditing = () => {
    if (localName.trim() && localName !== name)
      dispatch(renameFile({ id, name: localName }));

    setIsEditing(false);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleFinishEditing();
  };

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
          <ExpandIcon
            onExpand={
              mediaRef.current
                ? onOpenModal(mediaRef.current.src, description)
                : undefined
            }
            className='text-neutral-100 absolute top-1 left-1'
          />
        )}
        {isHovered && !isSelected && !isEditing && (
          <EditIcon
            className='text-neutral-100 absolute bottom-1 right-1'
            onEdit={handleEditClick}
          />
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
          ref={mediaRef}
          src={src}
          alt={description}
          className='rounded-sm border-2 border-solid border-neutral-60 max-w-full max-h-full'
        />
      </div>
      {isEditing ? (
        <input
          className='h-7 flex text-center text-xs text-secondary-100 w-full border-1 border-solid border-secondary-100 rounded-md outline-0'
          type='text'
          value={localName}
          onClick={(e) => e.stopPropagation()}
          onChange={handleNameChange}
          onBlur={handleFinishEditing}
          onKeyDown={handleEnter}
          autoFocus
        />
      ) : (
        <p className='h-7 flex justify-center items-center text-xs text-secondary-80'>
          <span>{editedName}</span>
          <span>.{extension}</span>
        </p>
      )}
    </div>
  );
};

export default MediaCard;
