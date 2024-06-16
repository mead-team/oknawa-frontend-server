import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export interface MapIdState {
  map_id: string;
  map_host_id: string;
}

const initialState: MapIdState = {
  map_id: '',
  map_host_id: '',
};

export const mapIdState = atomWithStorage<MapIdState>(
  'mapIdInfo',
  initialState,
  createJSONStorage(() => sessionStorage),
);
