'use client';

import { Button, useDisclosure } from '@nextui-org/react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';

import DistanceSummary from './components/DistanceSummary';
import HotPlaceModal from './components/HotPlaceModal';
import ResultMap from './components/ResultMap';

import { usePlaceSearchWithShareKeyQuery } from '@/hooks/query/search';

import { resultState } from '@/jotai/result/store';

declare let Kakao: any;

export default function ResultBody() {
  const router = useRouter();
  const searchParams = useSearchParams().get('sharekey');
  const [result, setResult] = useAtom(resultState);
  const { station_name, share_key } = result;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, isLoading } = usePlaceSearchWithShareKeyQuery(searchParams);

  const handleHotplaceBtnClick = () => {
    onOpen();
  };

  const handleKakaoSharingBtnClick = () => {
    try {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `오늘은 ${station_name} 에서 만나요!`,
          description: '약속장소를 확인해보세요!',
          imageUrl:
            'http://k.kakaocdn.net/dn/bSbH9w/btqgegaEDfW/vD9KKV0hEintg6bZT4v4WK/kakaolink40_original.png',
          link: {
            webUrl: `http://localhost:3000/result?sharekey=${share_key}`,
            mobileWebUrl: `http://localhost:3000/result?sharekey=${share_key}`,
          },
        },
      });
    } catch (error) {
      console.error('Kakao share error:', error);
    }
  };

  const initializeKakaoSDK = () => {
    if (typeof window !== 'undefined' && !Kakao.isInitialized()) {
      try {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_APP_KEY);
      } catch (error) {
        console.error('Kakao init error:', error);
      }
    }
  };

  const updateResultData = () => {
    if (data) {
      setResult(data);
    }
  };

  const redirectToMainPage = () => {
    if (!station_name) {
      router.push('/');
    }
  };

  useEffect(() => {
    initializeKakaoSDK();

    if (searchParams) {
      updateResultData();
    } else {
      redirectToMainPage();
    }
  }, [searchParams, data]);

  if (isLoading) return null;

  return (
    <Container>
      <DistanceSummary />
      <ResultMap />
      <SharingButton
        radius="full"
        size="sm"
        color="warning"
        variant="shadow"
        onClick={handleKakaoSharingBtnClick}
      >
        공유하기
      </SharingButton>
      <FloatingButton
        radius="full"
        size="lg"
        color="success"
        variant="shadow"
        onClick={handleHotplaceBtnClick}
      >
        핫플레이스 보기
      </FloatingButton>
      <HotPlaceModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </Container>
  );
}

const Container = styled.main`
  position: relative;
  width: 100%;
`;

const FloatingButton = styled(Button)`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const SharingButton = styled(Button)`
  position: absolute;
  bottom: 16px;
  right: -5%;
  transform: translateX(-50%);
  z-index: 10;
`;
