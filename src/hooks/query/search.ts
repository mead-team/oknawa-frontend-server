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

export const useInputStatusListQuery = (roomId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['inputStatusList', roomId],
    queryFn: () => SearchService.getInputStatusList(roomId),
  });

  const participant = data?.participant;
  const roomIdFromBack = data?.room_id;

  return { data, participant, isLoading };
};
