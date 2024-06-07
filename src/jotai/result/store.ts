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

export interface Participant {
  start_x: number;
  start_y: number;
}

export interface RequestInfo {
  participant: Participant[];
}

interface ResultObject {
  station_name: string;
  address_name: string;
  end_x: number;
  end_y: number;
  share_key: string;
  itinerary: ItineraryItem[];
  request_info: RequestInfo;
}

const initialResultObject: ResultObject = {
  station_name: '',
  address_name: '',
  end_x: 0,
  end_y: 0,
  share_key: '',
  itinerary: [],
  request_info: { participant: [] },
};

interface ResultState {
  station_info: ResultObject[];
}

const initialState: ResultState = {
  station_info: [initialResultObject],
};

export const resultState = atomWithStorage<ResultState>(
  'result',
  initialState,
  createJSONStorage(() => sessionStorage),
);
