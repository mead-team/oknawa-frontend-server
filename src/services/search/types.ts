interface UserSectionType {
  name?: string;
  address: {
    fullAddress: string;
    latitude?: number;
    longitude?: number;
    regionName?: string;
  };
}

export interface SearchFormType {
  userSection?: UserSectionType[];
}

export interface SubmitDeparturePointRequestBody {
  room_id: string;
  name: string;
  region_name: string;
  start_x: 0;
  start_y: 0;
}

export interface MapIdType {
  mapId: string;
  mapHostId: string;
}
