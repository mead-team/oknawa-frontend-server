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

interface NewParticipant {
  name: string;
  is_active: boolean;
}

const initialNewParticipant: NewParticipant = {
  name: '',
  is_active: false,
};

const initialNewParticipants: NewParticipant[] = [initialNewParticipant];

export const newParticipantsState = atomWithStorage<NewParticipant[]>(
  'newParticipants',
  initialNewParticipants,
  createJSONStorage(() => sessionStorage),
);
