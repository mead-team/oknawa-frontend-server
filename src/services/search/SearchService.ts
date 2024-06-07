import { api } from '@/axois';

import SearchForm from '@/model/search/SearchForm';

import { SearchFormType } from './types';
import { SearchState } from '@/jotai/global/store';

export default class SearchService {
  static async searchPlaces(searchForm: SearchState[]) {
    const requestBody = SearchForm.convertToRequestBody(searchForm);

    const { data } = await api.post('/location/points', { ...requestBody });

    console.log('searchPlaces:', data);

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
}
