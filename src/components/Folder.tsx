import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectActiveFolder } from '../app/selectors';
import { setSelectedFolder } from '../app/slices/mediaSlice';
import { FolderIdType } from '../types/file';
import FolderIcon from './icons/FolderIcon';

interface FolderPropsInterface {
  name: string;
  quantity: number;
  folderId: FolderIdType;
}

const Folder = ({ name, quantity, folderId }: FolderPropsInterface) => {
  const dispatch = useAppDispatch();
  const handleSelectFolder = () => dispatch(setSelectedFolder(folderId));

  const isActive = folderId === useAppSelector(selectActiveFolder);

  return (
    <div
      onClick={handleSelectFolder}
      className={`h-8 flex items-center gap-2 pr-2 pl-2 text-sm hover:bg-secondary-transparent-5 duration-200 ${
        isActive && 'bg-secondary-transparent-5'
      } rounded-md cursor-pointer`}
    >
      <FolderIcon className='text-secondary-80' />
      <span className='text-secondary-100'>{name}</span>
      <span className='text-secondary-40'>{quantity}</span>
    </div>
  );
};

export default Folder;
