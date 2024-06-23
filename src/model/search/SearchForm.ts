import { SearchState } from '@/jotai/global/store';
import { SearchFormType } from '@/services/search/types';

export default class SearchForm {
  static convertToRequestBody(searchForm: SearchState[]) {
    return {
      participant: searchForm?.map(
        ({ name, address: { latitude, longitude, regionName } }) => ({
          name,
          start_x: longitude,
          start_y: latitude,
          region_name: regionName,
        }),
      ),
    };
  }
}
