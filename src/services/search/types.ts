interface UserSectionType {
  name?: string;
  address: { fullAddress: string; latitude: number; longitude: number };
}

export interface SearchFormType {
  userSection: UserSectionType[];
}
