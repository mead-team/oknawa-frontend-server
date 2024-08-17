import { atomWithStorage, createJSONStorage } from 'jotai/utils';

interface InitialState {
  roomId: string;
  hostId: string;
}

const initialState: InitialState = {
  roomId: '',
  hostId: '',
};

export const roomState = atomWithStorage(
  'room',
  initialState,
  createJSONStorage(() => localStorage),
);
