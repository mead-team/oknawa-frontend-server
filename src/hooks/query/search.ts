import { useQuery, useQueryClient } from '@tanstack/react-query';

import SearchService from '@/services/search/SearchService';
import { MapIdType } from '@/services/search/types';

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
    refetchInterval: 5000,
  });

  const participant = data?.participant;
  const roomIdFromBack = data?.room_id;

  return { data, participant, isLoading };
};

export const usePlaceSearchMapIdQuery = (mapId: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['placeSearchMapId', mapId],
    queryFn: () => SearchService.searchPolling(mapId),
    refetchInterval: 2000,
  });

  const clearRefetchInterval = () => {
    queryClient.setQueryDefaults(['placeSearchMapId', mapId], {
      refetchInterval: false,
    });
    console.log('종료 성공!');
  };

  return {
    data,
    isLoading,
    clearRefetchInterval,
  };
};
