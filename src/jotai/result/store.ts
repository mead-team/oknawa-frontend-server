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
  name: string;
  region_nmae: string;
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
  vote: number;
}

const InitialRequestInfo: RequestInfo = {
  participant: [],
};

const initialResultObject: ResultObject = {
  station_name: '',
  address_name: '',
  end_x: 0,
  end_y: 0,
  share_key: '',
  itinerary: [],
  request_info: InitialRequestInfo,
  vote: 0,
};

interface ResultState {
  station_info: ResultObject[];
  request_info: RequestInfo;
}

const initialState: ResultState = {
  station_info: [initialResultObject],
  request_info: InitialRequestInfo,
};

export const resultState = atomWithStorage<ResultState>(
  'result',
  initialState,
  createJSONStorage(() => sessionStorage),
);

interface ShareKeyState {
  share_key: string;
}
const initialShareKeyState: ShareKeyState = {
  share_key: '',
};

export const shareKeyState = atomWithStorage<ShareKeyState>(
  'confirmShareKey',
  initialShareKeyState,
  createJSONStorage(() => sessionStorage),
);
