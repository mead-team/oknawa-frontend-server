import { atom } from 'jotai';
import { atomWithReset, atomWithStorage, createJSONStorage } from 'jotai/utils';
import { ReactNode } from 'react';

interface ModalState {
  isOpen: boolean;
  title?: string;
  buttonLabel?: string;
  contents: string;
}

export interface SearchState {
  name: string;
  address: {
    fullAddress: string;
    latitude: number;
    longitude: number;
    regionName: string;
  };
}

interface BottomSheetState {
  isOpen: boolean;
  title: string | ReactNode;
  contents: ReactNode;
  height: number;
  isFullContents: boolean;
}

const initialState: ModalState = {
  isOpen: false,
  title: '',
  buttonLabel: '',
  contents: '',
};

const bottomSheetInitialState: BottomSheetState = {
  isOpen: false,
  title: null,
  contents: null,
  height: 52,
  isFullContents: false,
};

export const modalState = atomWithReset<ModalState>(initialState);

export const searchState = atom<SearchState[]>([]);

export const bottomSheetState = atomWithReset<BottomSheetState>(
  bottomSheetInitialState,
);

export const searchHistoryState = atomWithStorage(
  'searchHistory',
  initialState,
  createJSONStorage(() => localStorage),
);
