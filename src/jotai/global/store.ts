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

export const modalState = atomWithReset<ModalState>(initialState);
