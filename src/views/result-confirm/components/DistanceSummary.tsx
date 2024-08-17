'use client';

import { useRouter } from 'next/navigation';

import useModal from '@/hooks/common/useModal';
import useDistanceSummary from '@/hooks/useDistanceSummary';

import { convertToKoreanTime } from '@/utils/date';

import { ShareIcon } from '@/assets/icons/Share';
import { HomeIcon } from '@/assets/icons/Home';

import { useResetAtom } from 'jotai/utils';
import { modalState } from '@/jotai/global/store';

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

export default function DistanceSummary({
  stationName,
  shareKey,
  averageTravelTime,
}: any) {
  const router = useRouter();

  const { initKakao, kakaoShareSendDefault } = useDistanceSummary();

  const reset = useResetAtom(modalState);

  const { setModalContents } = useModal();

  const handleKakaoSharingBtnClick = (stationName: any, shareKey: any) => {
    initKakao();
    kakaoShareSendDefault(stationName, shareKey);
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
          onClick={() => handleKakaoSharingBtnClick(stationName, shareKey)}
        >
          <ShareIcon />
          공유하기
        </SharingButton>
      </Header>
      <ExpandBody>
        <ContentWrapper>
          <TitleWrapper>
            <StationName>{stationName}을 추천해요</StationName>
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
