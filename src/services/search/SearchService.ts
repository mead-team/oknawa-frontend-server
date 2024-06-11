import { api } from '@/axois';

import MockAdapter from 'axios-mock-adapter';
import mockData from './mock.json';

import SearchForm from '@/model/search/SearchForm';

import { SearchFormType } from './types';
import { SearchState } from '@/jotai/global/store';

// Mock Adapter 인스턴스 생성
// const mock = new MockAdapter(api);

// 특정 엔드포인트 모킹 설정
// mock.onPost('/location/points').reply(200, mockData);

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
