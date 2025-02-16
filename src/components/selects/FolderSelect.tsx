import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectActiveFolder } from '../../app/selectors';
import { changeFolder } from '../../app/slices/mediaSlice';
import { FolderIdType } from '../../types/file';
import getFolders from '../../utils/getFolders';
import ArrowIcon from '../icons/ArrowIcon';
import FolderIcon from '../icons/FolderIcon';

const FolderSelect = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();

  const activeFolder = useAppSelector(selectActiveFolder);

  const handleChangeFolder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === activeFolder) return;
    dispatch(changeFolder(e.target.value as FolderIdType));
  };

  const folders = getFolders();

  return (
    <label className={`${className} relative`}>
      <FolderIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 pointer-events-none' />
      <select
        value={activeFolder}
        onChange={handleChangeFolder}
        className='h-8 text-sm text-secondary-100 pl-9 pr-9 border-1 border-solid border-secondary-20 hover:border-secondary-100 rounded-md appearance-none cursor-pointer duration-200'
      >
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
      <ArrowIcon className='absolute top-1/2 transform -translate-y-1/2 right-3 pointer-events-none text-secondary-60' />
    </label>
  );
};

export default FolderSelect;
