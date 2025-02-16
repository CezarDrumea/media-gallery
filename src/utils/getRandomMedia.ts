import { FOLDERS_QUANTITY, MEDIA_NAMES, MEDIA_QUANTITY } from '../data';
import { ExtensionsType, FileInterface, FolderIdType } from '../types/file';

const getRandomFolderId = (): FolderIdType =>
  `folder${Math.floor(Math.random() * FOLDERS_QUANTITY)}`;

const getRandomSize = () => Math.floor((Math.random() + 2) * 200);

const extensions = Object.keys(MEDIA_NAMES) as ExtensionsType[];

const getRandomExtension = () =>
  extensions[Math.floor(Math.random() * extensions.length)];

const getRandomName = (extension: ExtensionsType) => {
  return MEDIA_NAMES[extension][
    Math.floor(Math.random() * MEDIA_NAMES[extension].length)
  ];
};

const getRandomMedia = (): FileInterface[] =>
  [...new Array(MEDIA_QUANTITY)].map((_, i) => {
    const height = getRandomSize();
    const width = getRandomSize();
    const extension = getRandomExtension();
    const name = getRandomName(extension);
    const folderId = getRandomFolderId();

    return {
      id: `file${i}`,
      name: `${name}-${i + 1}`,
      src: `https://picsum.photos/${height}/${width}`,
      description: `random ${name?.replaceAll('-', '')}`,
      extension,
      folderId,
    };
  });

export default getRandomMedia;
