import { useQuery, keepPreviousData } from '@tanstack/react-query';

import HotPlaceService from '@/services/hot-place/HotPlaceService';

import {
  HotPlace,
  HotPlaceCategory,
  HotPlacePoint,
} from '@/services/hot-place/types';

export const useHotPlaceQuery = (
  category: HotPlaceCategory,
  point: HotPlacePoint,
) => {
  const { data, isLoading } = useQuery<HotPlace[], Error>({
    queryKey: ['hotPlace', category, point],
    queryFn: () => HotPlaceService.fetchHotPlace(category, point),
    placeholderData: keepPreviousData,
  });

  return {
    data,
    isLoading,
  };
};
