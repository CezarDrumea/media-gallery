import ArrowIcon from '../icons/ArrowIcon';
import FolderIcon from '../icons/FolderIcon';

const FolderSelect = ({ className }: { className?: string }) => {
  return (
    <label className={`${className} relative`}>
      <FolderIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 pointer-events-none' />
      <select className='h-8 text-sm text-secondary-100 pl-9 pr-9 border-1 border-solid border-secondary-20 hover:border-secondary-100 rounded-md appearance-none cursor-pointer duration-200'>
        <option value='Your folder'>Your folder</option>
        <option value='New folder'>New folder</option>
      </select>
      <ArrowIcon className='absolute top-1/2 transform -translate-y-1/2 right-3 pointer-events-none text-secondary-60' />
    </label>
  );
};

export default FolderSelect;
