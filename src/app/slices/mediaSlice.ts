import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getRandomMedia from '../../utils/getRandomMedia';
import {
  ExtensionsType,
  FileIdType,
  FileInterface,
  FolderIdType,
  SelectedFilesRecord,
} from '../../types/file';

interface ExtensionFiltersInterface {
  jpg: boolean;
  gif: boolean;
  mp4: boolean;
}

interface MediaStateInterface {
  files: FileInterface[];
  selectedFiles: SelectedFilesRecord;
  extensionFilters: ExtensionFiltersInterface;
  folders: Record<FolderIdType, boolean>;
  searchQuery: string;
}

const allFiles = getRandomMedia();

const folderIdsSet = allFiles.reduce((acc, file) => {
  acc.add(file.folderId);
  return acc;
}, new Set() as Set<FolderIdType>);

const folders = Object.fromEntries(
  [...folderIdsSet].map((id, i) => [id, i === 0])
);

const initialState: MediaStateInterface = {
  files: allFiles,
  selectedFiles: {},
  extensionFilters: {
    jpg: true,
    gif: true,
    mp4: true,
  },
  folders,
  searchQuery: '',
};

export const mediaSlice = createSlice({
  name: 'media',
  initialState,

  reducers: {
    toggleExtensionFilter: (state, action: PayloadAction<ExtensionsType>) => {
      state.extensionFilters[action.payload] =
        !state.extensionFilters[action.payload];
    },

    toggleAllExtensionFilters: (state) => {
      const allSelected = Object.values(state.extensionFilters).every(
        (value) => value === true
      );

      for (const key in state.extensionFilters) {
        state.extensionFilters[key as keyof ExtensionFiltersInterface] =
          !allSelected;
      }
    },

    setSelectedFolder: (state, action: PayloadAction<FolderIdType>) => {
      for (const key in state.folders) {
        state.folders[key as keyof typeof state.folders] =
          action.payload === key;
      }
    },

    addFileToSelectedFiles: (state, action: PayloadAction<FileIdType>) => {
      const currentOrders = Object.values(state.selectedFiles).filter(
        (order) => order > 0
      );
      let nextOrder = 1;
      while (currentOrders.includes(nextOrder)) {
        nextOrder++;
      }
      state.selectedFiles[action.payload] = nextOrder;
    },

    removeFileFromSelectedFiles: (state, action: PayloadAction<FileIdType>) => {
      const removedOrder = state.selectedFiles[action.payload];

      delete state.selectedFiles[action.payload];

      Object.keys(state.selectedFiles).forEach((fileId) => {
        if (state.selectedFiles[fileId as FileIdType] > removedOrder) {
          state.selectedFiles[fileId as FileIdType]--;
        }
      });
    },

    setSelectedFiles: (state, action: PayloadAction<SelectedFilesRecord>) => {
      state.selectedFiles = action.payload;
    },

    deleteSelectedFiles: (state) => {
      state.files = state.files.filter(
        (file) => !((file.id as FileIdType) in state.selectedFiles)
      );

      state.selectedFiles = Object.fromEntries(
        Object.entries(state.selectedFiles).filter(([fileId]) =>
          state.files.some((file) => file.id === fileId)
        )
      );
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  toggleExtensionFilter,
  toggleAllExtensionFilters,
  setSelectedFolder,
  addFileToSelectedFiles,
  removeFileFromSelectedFiles,
  setSelectedFiles,
  setSearchQuery,
  deleteSelectedFiles,
} = mediaSlice.actions;

export default mediaSlice.reducer;
