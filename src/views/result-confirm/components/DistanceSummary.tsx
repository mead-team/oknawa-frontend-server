'use client';

import { useRouter } from 'next/navigation';

import { useAtom } from 'jotai';

import { newParticipantsState } from '@/jotai/result/store';

import useDistanceSummary from '@/hooks/useDistanceSummary';
import useModal from '@/hooks/common/useModal';

import { convertToKoreanTime } from '@/utils/date';

import { ShareIcon } from '@/assets/icons/Share';
import { HomeIcon } from '@/assets/icons/Home';

import {
  Container,
  ArrivalTime,
  AverageArrivalTime,
  ExpandBody,
  ContentWrapper,
  Header,
  HomeButton,
  SharingButton,
  StationName,
  TitleWrapper,
} from '../style';
import { useEffect, useState } from 'react';
import { useResetAtom } from 'jotai/utils';
import { modalState } from '@/jotai/global/store';

export default function DistanceSummary({
  stationName,
  shareKey,
  averageTravelTime,
}: any) {
  const router = useRouter();

  const { initKakao, kakaoShareSendDefault } = useDistanceSummary();

  const reset = useResetAtom(modalState);

  const [fullUrl, setFullUrl] = useState('');

  const { setModalContents } = useModal();

  // const handleKakaoSharingBtnClick = (stationName: any, shareKey: any) => {
  //   initKakao();
  //   kakaoShareSendDefault(stationName, shareKey);
  // };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullUrl(window.location.href);
    }
  }, []);

  const clickInvitation = async () => {
    const link = `${fullUrl}?sharekey=${shareKey}`;
    try {
      await navigator.clipboard.writeText(link);
      setModalContents({
        buttonLabel: '확인',
        contents: '링크가 복사되었습니다!',
      });
    } catch (err) {
      console.error('클립보드에 복사 실패:', err);
    }
  };

  const clickHome = () => {
    setModalContents({
      buttonLabel: '취소',
      buttonLabel02: '확인',
      contents: '홈으로 돌아가시겠어요?',
      onConfirm: goToHome,
    });
  };

  const goToHome = () => {
    router.push('/');
    reset();
  };

  return (
    <Container>
      <Header>
        <HomeButton onClick={clickHome}>
          <HomeIcon />
        </HomeButton>
        <SharingButton
          // onClick={() => handleKakaoSharingBtnClick(stationName, shareKey)}
          onClick={clickInvitation}
        >
          <ShareIcon />
          공유하기
        </SharingButton>
      </Header>
      <ExpandBody>
        <ContentWrapper>
          <TitleWrapper>
            <StationName>{stationName}</StationName>
            <AverageArrivalTime>
              도착하는데 평균{' '}
              <ArrivalTime>
                {convertToKoreanTime(averageTravelTime)}
              </ArrivalTime>{' '}
              걸려요!
            </AverageArrivalTime>
          </TitleWrapper>
        </ContentWrapper>
      </ExpandBody>
    </Container>
  );
}
