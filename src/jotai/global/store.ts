import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { ReactNode } from 'react';

interface ModalState {
  isOpen: boolean;
  isTitle?: boolean;
  isButton?: boolean;
  title?: string;
  buttonLabel?: string;
  contents: ReactNode;
}

interface SearchState {
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
}

const initialState: ModalState = {
  isOpen: false,
  isTitle: false,
  isButton: true,
  title: '타이틀',
  buttonLabel: '버튼',
  contents: null,
};

const bottomSheetInitialState: BottomSheetState = {
  isOpen: false,
  title: null,
  contents: null,
  height: 52,
};

export const modalState = atomWithReset<ModalState>(initialState);

export const searchState = atom<SearchState[]>([]);

export const bottomSheetState = atomWithReset<BottomSheetState>(
  bottomSheetInitialState,
);
