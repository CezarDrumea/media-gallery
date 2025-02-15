import { FOLDERS_QUANTITY } from '../data';
import { FolderIdType } from '../types/file';

const getFolders = () => {
  return [...new Array(FOLDERS_QUANTITY)].map((_, i) => {
    return {
      id: `folder${i}`,
      name: `${i === 0 ? 'Your folder' : 'New folder'}`,
    } as {
      id: FolderIdType;
      name: string;
    };
  });
};

export default getFolders;
