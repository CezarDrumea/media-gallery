export type ExtensionsType = 'jpg' | 'gif' | 'mp4';

export type FolderIdType = `folder${number}`;

export type FileIdType = `file${number}`;

export interface FileInterface {
  id: FileIdType;
  name: string;
  src: string;
  description: string;
  folderId: FolderIdType;
  extension: ExtensionsType;
}

export type SelectedFilesRecord = Record<FileIdType, number>;
