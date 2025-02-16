import { FOLDERS_QUANTITY } from '../data';
import { FolderIdType } from '../types/file';

const getFolderName = (idNum: number) => {
  if (idNum === 0) return 'Your folder';
  if (idNum === 1) return 'New folder';

  return `New folder (${idNum + 1})`;
};

const getFolders = () => {
  return [...new Array(FOLDERS_QUANTITY)].map((_, i) => {
    return {
      id: `folder${i}`,
      name: getFolderName(i),
    } as {
      id: FolderIdType;
      name: string;
    };
  });
};

export default getFolders;
