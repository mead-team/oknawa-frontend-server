import { SearchFormType } from '@/services/search/types';

export default class SearchForm {
  static convertToRequestBody(searchForm: SearchFormType) {
    return {
      participant: searchForm?.userSection?.map(
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
