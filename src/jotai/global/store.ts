import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { ReactNode } from 'react';

interface ModalState {
  isOpen: boolean;
  title: string;
  contents: ReactNode;
}

interface SearchState {
  name: string;
  address: {
    fullAddress: string;
    latitude: number;
    longitude: number;
  };
}

interface BottomSheetState {
  isOpen: boolean;
  title: string;
  contents: ReactNode;
}

const initialState: ModalState = {
  isOpen: false,
  title: '',
  contents: null,
};

const bottomSheetInitialState: BottomSheetState = {
  isOpen: false,
  title: '',
  contents: null,
};

export const modalState = atomWithReset<ModalState>(initialState);

export const searchState = atom<SearchState[]>([]);

export const bottomSheetState = atomWithReset<BottomSheetState>(
  bottomSheetInitialState,
);
