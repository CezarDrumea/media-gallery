import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { FileIdType, FolderIdType, SelectedFilesRecord } from '../types/file';

export const selectAllFiles = (state: RootState) => state.media.files;

export const selectExtensionFilters = (state: RootState) =>
  state.media.extensionFilters;

export const selectSearchQuery = (state: RootState) => state.media.searchQuery;

export const selectFolderActivities = (state: RootState) => state.media.folders;

export const selectSelectedMediaOrder =
  (fileId: FileIdType) => (state: RootState) =>
    state.media.selectedFiles[fileId];

export const selectSelectedMediaQuantity = (state: RootState) =>
  Object.values(state.media.selectedFiles).length;

export const selectActiveFolder = createSelector(
  [selectFolderActivities],
  (folders) =>
    Object.keys(folders).find(
      (key) => folders[key as keyof typeof folders]
    ) as FolderIdType
);

export const selectActiveFolderMedia = createSelector(
  [selectAllFiles, selectActiveFolder],
  (files, activeFolderId) => {
    return activeFolderId
      ? files.filter((file) => file.folderId === activeFolderId)
      : files;
  }
);

export const selectAllFoldersIds = createSelector(
  [(state: RootState) => state.media.folders],
  (folders) => Object.keys(folders)
);

export const selectFolderMediaQuantities = createSelector(
  [selectAllFiles, selectAllFoldersIds],
  (files, folders) => {
    const quantities = files.reduce((acc, file) => {
      acc[file.folderId] = (acc[file.folderId] || 0) + 1;
      return acc;
    }, {} as Record<FolderIdType, number>);

    folders.forEach((folderId) => {
      if (!quantities[folderId as FolderIdType]) {
        quantities[folderId as FolderIdType] = 0;
      }
    });

    return quantities;
  }
);

export const selectFilteredMedia = createSelector(
  [selectActiveFolderMedia, selectExtensionFilters],
  (files, filters) => {
    if (Object.values(filters).every((value) => value === true)) return files;
    return files.filter(({ extension }) => filters[extension]);
  }
);

export const selectAreAllExtensionFiltersChecked = createSelector(
  [selectExtensionFilters],
  (filters) => Object.values(filters).every((value) => value === true)
);

export const selectMediaTypeQuantities = createSelector(
  [selectActiveFolderMedia],
  (files) => {
    const groups = Object.groupBy(files, (file) => file.extension);

    return {
      jpgQuantity: groups.jpg ? groups.jpg.length : 0,
      gifQuantity: groups.gif ? groups.gif.length : 0,
      mp4Quantity: groups.mp4 ? groups.mp4.length : 0,
    };
  }
);

export const selectSearchedMedia = createSelector(
  [selectFilteredMedia, selectSearchQuery],
  (files, query) => {
    if (!query.trim()) return files;
    return files.filter((file) =>
      file.name.toLowerCase().includes(query.toLowerCase())
    );
  }
);

export const selectTransformedFilteredMediaToSelectedMedia = createSelector(
  [selectSearchedMedia],
  (files) => {
    return files.reduce((acc, file, i) => {
      acc[file.id as FileIdType] = i + 1;
      return acc;
    }, {} as SelectedFilesRecord);
  }
);
