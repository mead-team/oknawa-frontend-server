import { api } from '@/axois';

import SearchForm from '@/model/search/SearchForm';

import { SearchFormType } from './types';

export default class SearchService {
  static async searchPlaces(searchForm: SearchFormType) {
    const requestBody = SearchForm.convertToRequestBody(searchForm);

    const { data } = await api.post('/location/point', { ...requestBody });

    return data;
  }
}
