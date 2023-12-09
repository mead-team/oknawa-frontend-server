import { atomWithReset } from 'jotai/utils';

interface ItineraryItem {
  name: string;
  itinerary: {
    totalTime: number;
    total_polyline: {
      lat: number;
      lng: number;
    }[];
  };
}

interface ResultState {
  address_name: string;
  end_x: number;
  end_y: number;
  itinerary: ItineraryItem[];
  station_name: string;
}

const initialState: ResultState = {
  address_name: '',
  end_x: 0,
  end_y: 0,
  itinerary: [],
  station_name: '',
};

export const resultState = atomWithReset(initialState);
