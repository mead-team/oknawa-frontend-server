export type HotPlaceCategory = 'food' | 'cafe' | 'drink';

export type HotPlacePoint = {
  x: number;
  y: number;
};

export interface HotPlace {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  main_photo_url: string;
  x: string;
  y: string;
  day_business_hours_infos: any;
}
