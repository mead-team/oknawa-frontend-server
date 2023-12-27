import { useQuery } from '@tanstack/react-query';

import SearchService from '@/services/search/SearchService';

export const usePlaceSearchWithShareKeyQuery = (shareKey?: string | null) => {
  const { data, isLoading } = useQuery({
    queryKey: ['placeSearchWithShareKey', shareKey],
    queryFn: () => SearchService.searchPlacesWithShareKey(shareKey),
    enabled: Boolean(shareKey),
  });

  return {
    data,
    isLoading,
  };
};
