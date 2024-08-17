export default class SearchFormWithTogether {
  static convertToRequestBody(searchForm: any) {
    return {
      name: searchForm.name,
      region_name: searchForm.address.regionName,
      start_x: searchForm.address.longitude,
      start_y: searchForm.address.latitude,
    };
  }
}
