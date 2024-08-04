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

export default function DistanceSummary({
  stationName,
  shareKey,
  averageTravelTime,
}: any) {
  const router = useRouter();

  const { initKakao, kakaoShareSendDefault } = useDistanceSummary();

  const handleKakaoSharingBtnClick = (stationName: any, shareKey: any) => {
    initKakao();
    kakaoShareSendDefault(stationName, shareKey);
  };

  const clickHome = () => {
    router.push('/');
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
