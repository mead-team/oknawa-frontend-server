import { api, edgeApi, pollingApi } from '@/axois';

import SearchForm from '@/model/search/SearchForm';

import { SubmitDeparturePointRequestBody } from './types';
import { SearchState } from '@/jotai/global/store';
import SearchFormWithTogether from '@/model/search-together/SearchFormWithTogether';

export default class SearchService {
  static async searchPlaces(searchForm: SearchState[]) {
    const requestBody = SearchForm.convertToRequestBody(searchForm);

    const { data } = await edgeApi.post('/functions/v1/location-points', { ...requestBody });

    console.log('searchPlaces:', data);

    return data;
  }

  static async searchPolling(mapId: string) {
    const { data } = await pollingApi.get(`/rest/v1/location_result?map_id=eq.${mapId}&select=*,station_info!station_info_map_id_fkey(*)`);

    console.log('searchPolling:', data);

    return data;
  }

  static async searchPlacesWithShareKey(shareKey?: string | null) {
    if (!shareKey) {
      return;
    }

    const { data } = await pollingApi.get(`/rest/v1/station_info?share_key=eq.${shareKey}&select=*`);

    console.log('searchPlacesWithShareKey:', data);

    return data;
  }

  static async makeRoom(searchForm: any) {
    const requestBody = SearchFormWithTogether.convertToRequestBody(searchForm);

    const { data } = await api.post('/rest/v1/rpc/location_together', { ...requestBody });

    return data;
  }

  static async getInputStatusList(roomId: string) {
    const res = await pollingApi.get(`/rest/v1/location_room?room_id=eq.${roomId}&select=*,participant!participant_room_id_fkey(*)`);
    return res.data;
  }

  static async submitDeparturePoint(
    requestBody: SubmitDeparturePointRequestBody,
  ) {
    const { data } = await api.post(`/rest/v1/participant`, {
      ...requestBody,
    });

    return data;
  }
}
