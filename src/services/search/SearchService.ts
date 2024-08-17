import { api } from '@/axois';

import SearchForm from '@/model/search/SearchForm';

<<<<<<< HEAD
import { SearchState } from '@/jotai/global/store';
import { MapIdType } from './types';
=======
import { SubmitDeparturePointRequestBody } from './types';
import { SearchState } from '@/jotai/global/store';
import SearchFormWithTogether from '@/model/search-together/SearchFormWithTogether';
>>>>>>> main

export default class SearchService {
  static async searchPlaces(searchForm: SearchState[]) {
    const requestBody = SearchForm.convertToRequestBody(searchForm);

    const { data } = await api.post('/location/points', { ...requestBody });

    console.log('searchPlaces:', data);

    return data;
  }

  static async searchPolling(mapId: string) {
    const { data } = await api.get(`/location/points/${mapId}/polling`);

    console.log('searchPolling:', data);

    return data;
  }

  static async searchPlacesWithShareKey(shareKey?: string | null) {
    if (!shareKey) {
      return;
    }

    const { data } = await api.get('/location/point', {
      params: { share_key: shareKey },
    });

    console.log('searchPlacesWithShareKey:', data);

    return data;
  }

  static async makeRoom(searchForm: any) {
    const requestBody = SearchFormWithTogether.convertToRequestBody(searchForm);

    const { data } = await api.post('/location/together', { ...requestBody });

    return data;
  }

  static async getInputStatusList(roomId: string) {
    const res = await api.get(`/location/together/${roomId}/polling`);

    return res.data;
  }

  static async submitDeparturePoint(
    requestBody: SubmitDeparturePointRequestBody,
    roomId: string,
  ) {
    const { data } = await api.post(`/location/together/${roomId}`, {
      ...requestBody,
    });

    return data;
  }
}
