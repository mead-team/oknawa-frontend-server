'use client';

import { Button, useDisclosure } from '@nextui-org/react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useAtom } from 'jotai';

import DistanceSummary from './components/DistanceSummary';
import HotPlaceModal from './components/HotPlaceModal';
import ResultMap from './components/ResultMap';

import { resultState } from '@/jotai/result/store';

declare let Kakao: any;

export default function ResultBody() {
  const [result] = useAtom(resultState);
  const { station_name, address_name, share_key } = result;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  console.log('result', result);

  const handleHotplaceBtnClick = () => {
    onOpen();
  };

  const handleKakaoSharingBtnClick = () => {
    try {
      Kakao.Link.sendDefault({
        objectType: 'location',
        address: address_name,
        addressTitle: station_name,
        content: {
          title: `오늘은 ${station_name} 에서 만나요!`,
          description: '약속장소를 확인해보세요!',
          imageUrl:
            'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
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

  useEffect(() => {
    if (typeof window !== 'undefined' && !Kakao.isInitialized()) {
      try {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_APP_KEY);
      } catch (error) {
        console.error('Kakao init error:', error);
      }
    }
  }, []);

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
