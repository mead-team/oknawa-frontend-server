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

export interface MapIdType {
  mapId: string;
  mapHostId: string;
}
