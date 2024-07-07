import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export interface MapIdState {
  mapId: string;
  mapHostId: string;
}

const initialState: MapIdState = {
  mapId: '',
  mapHostId: '',
};

export const mapIdState = atomWithStorage<MapIdState>(
  'mapIdInfo',
  initialState,
  createJSONStorage(() => sessionStorage),
);
