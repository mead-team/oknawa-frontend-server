export interface KakaoPlace {
  id: string;
  place_name: string;
  road_address_name?: string;
  address_name: string;
  x: string;
  y: string;
}

export type KakaoPlacesSearchStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';
