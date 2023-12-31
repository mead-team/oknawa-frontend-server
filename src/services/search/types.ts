interface UserSectionType {
  name?: string;
  address: {
    fullAddress: string;
    latitude: number;
    longitude: number;
    regionName: string;
  };
}

export interface SearchFormType {
  userSection: UserSectionType[];
}
