import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export interface ItineraryItem {
  name: string;
  itinerary: {
    totalTime: number;
    total_polyline: {
      lat: number;
      lng: number;
    }[];
  };
  region_name: string;
}

interface Participant {
  start_x: number;
  start_y: number;
}

interface RequestInfo {
  participant: Participant[];
}

interface ResultConfirmState {
  address_name: string;
  end_x: number;
  end_y: number;
  itinerary: ItineraryItem[];
  station_name: string;
  share_key: string;
  request_info: RequestInfo;
}

const initialState: ResultConfirmState = {
  address_name: '',
  end_x: 0,
  end_y: 0,
  itinerary: [],
  station_name: '',
  share_key: '',
  request_info: { participant: [] },
};

export const resultConfirmState = atomWithStorage<ResultConfirmState>(
  'result-confirm',
  initialState,
  createJSONStorage(() => sessionStorage),
);
