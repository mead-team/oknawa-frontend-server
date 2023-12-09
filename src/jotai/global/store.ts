import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { ReactNode } from 'react';

interface ModalState {
  isOpen: boolean;
  title: string;
  contents: ReactNode;
}

const initialState: ModalState = {
  isOpen: false,
  title: '',
  contents: null,
};

interface SearchState {
  name: string;
  address: {
    fullAddress: string;
    latitude: number;
    longitude: number;
  };
}

export const modalState = atomWithReset<ModalState>(initialState);

export const searchState = atom<SearchState[]>([]);
