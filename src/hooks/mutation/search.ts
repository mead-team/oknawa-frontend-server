import { useMutation } from '@tanstack/react-query';

import SearchService from '@/services/search/SearchService';
import { SearchFormType } from '@/services/search/types';

export const usePlaceSearchMutation = () => {
  return useMutation({
    mutationKey: ['placeSearch'],
    mutationFn: (searchForm: SearchFormType) =>
      SearchService.searchPlaces(searchForm),
    onError: error => {
      console.log('error 발생!', error);
    },
  });
};
