import { useMutation } from '@tanstack/react-query';

import SearchService from '@/services/search/SearchService';
import { SearchFormType } from '@/services/search/types';

import { useSetAtom } from 'jotai';
import { modalState } from '@/jotai/global/store';
import { ReactNode } from 'react';

interface IModalProps {
  buttonLabel: string;
  contents: ReactNode;
}

export const usePlaceSearchMutation = () => {
  const setModal = useSetAtom(modalState);

  const setModalContents = ({ buttonLabel, contents }: IModalProps) => {
    setModal(pervState => ({
      ...pervState,
      isOpen: true,
      buttonLabel: buttonLabel,
      contents: contents,
    }));
  };

  return useMutation({
    mutationKey: ['placeSearch'],
    mutationFn: (searchForm: SearchFormType) =>
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
