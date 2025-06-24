import { useMutation } from '@tanstack/react-query';

import SearchService from '@/services/search/SearchService';
import { MapIdType } from '@/services/search/types';
import { SubmitDeparturePointRequestBody } from '@/services/search/types';

import { SearchState } from '@/jotai/global/store';

import useModal from '@/hooks/common/useModal';

export const usePlaceSearchMutation = () => {
  const { setModalContents } = useModal();

  return useMutation({
    mutationKey: ['placeSearch'],
    mutationFn: (searchForm: SearchState[]) =>
      SearchService.searchPlaces(searchForm),
    onError: error => {
      console.log('error 발생!', error);
      setModalContents({
        buttonLabel: '확인',
        contents: '지점을 찾을 수 없습니다.\n다시 검색해주세요.',
      });
    },
  });
};

export const usePlaceSearchMapIdMutation = () => {
  return useMutation({
    mutationKey: ['placeSearchMapId'],
    mutationFn: (mapId: string) => SearchService.searchPolling(mapId),
    onError: error => {
      console.log('error 발생!', error);
    },
  });
};

export const usePlaceSearchWithShareKeyMutation = () => {
  return useMutation({
    mutationKey: ['placeSearchWithShareKey'],
    mutationFn: (shareKey?: string | null) =>
      SearchService.searchPlacesWithShareKey(shareKey),
  });
};

export const useMakeRoomMutation = () => {
  return useMutation({
    mutationKey: ['roomMake'],
    mutationFn: (searchForm: any) => SearchService.makeRoom(searchForm),
    onError: error => {
      console.log('error 발생!', error);
    },
  });
};

export const useSubmitDeparturePointMutation = () => {
  return useMutation({
    mutationKey: ['submitDeparturePoint'],
    mutationFn: ({
      requestBody,
    }: {
      requestBody: SubmitDeparturePointRequestBody;
    }) => SearchService.submitDeparturePoint(requestBody),
    onError: error => {
      console.log('error 발생!', error);
    },
  });
};
