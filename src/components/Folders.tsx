import { useAppSelector } from '../app/hooks';
import { selectFolderMediaQuantities } from '../app/selectors';
import getFolders from '../utils/getFolders';

import Folder from './Folder';

const folders = getFolders();

console.log(folders);

const Folders = () => {
  const folderQuantities = useAppSelector(selectFolderMediaQuantities);

  return (
    <div>
      <h2 className='pl-2 mb-4 text-secondary-100 text-sm font-medium'>
        Folders
      </h2>
      <div className='flex gap-1 flex-col'>
        {folders.map((folder) => (
          <Folder
            key={folder.id}
            name={folder.name}
            quantity={folderQuantities[folder.id]}
            folderId={folder.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Folders;
