import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const initialState: any[] = [];

export const searchHistoryState = atomWithStorage(
  'searchHistory',
  initialState,
  createJSONStorage(() => localStorage),
);
