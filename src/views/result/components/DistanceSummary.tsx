'use client';

import { useRouter } from 'next/navigation';

import { convertToKoreanTime } from '@/utils/date';

import useDistanceSummary from '@/hooks/useDistanceSummary';

import { ShareIcon } from '@/assets/icons/Share';
import { HomeIcon } from '@/assets/icons/Home';
import { ChevronLeft } from '@/assets/icons/ChevronLeft';
import { ChevronRight } from '@/assets/icons/ChevronRight';
import { LikeIcon } from '@/assets/icons/Like';
import { LikeIconActive } from '@/assets/icons/LikeActive';

import {
  Container,
  ArrivalTime,
  AverageArrivalTime,
  Body,
  ButtonLine,
  ButtonPrimary,
  ButtonWrapper,
  ContentWrapper,
  Count,
  Header,
  HomeButton,
  Indicator,
  IndicatorWrapper,
  Label,
  LikeItem,
  LikeWrapper,
  PreffertWrapper,
  SharingButton,
  StationName,
  TitleWrapper,
  VoteTitle,
  VoteWrapper,
  ChevronButton,
} from '../style';

export default function DistanceSummary({
  station,
  stationName,
  shareKey,
  stationIndex,
  stationLength,
  onNext,
  onPrev,
}: any) {
  const router = useRouter();

  const { initKakao, kakaoShareSendDefault } = useDistanceSummary();

  const handleKakaoSharingBtnClick = (stationName: any, shareKey: any) => {
    initKakao();
    kakaoShareSendDefault(stationName, shareKey);
  };

  const likeItems = [
    {
      isActive: true,
    },
    {
      isActive: true,
    },
    {
      isActive: false,
    },
    {
      isActive: false,
    },
    {
      isActive: false,
    },
    {
      isActive: false,
    },
    {
      isActive: false,
    },
    {
      isActive: false,
    },
    {
      isActive: false,
    },
    {
      isActive: false,
    },
  ];

  const clickHome = () => {
    router.push('/');
  };

  return (
    <>
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
        <Body>
          <ContentWrapper>
            <TitleWrapper>
              <StationName>{stationName}</StationName>
              <AverageArrivalTime>
                도착하는데 평균{' '}
                <ArrivalTime>
                  {convertToKoreanTime(station.averageTravelTime)}
                </ArrivalTime>{' '}
                걸려요!
              </AverageArrivalTime>
            </TitleWrapper>
            <IndicatorWrapper>
              <ChevronButton onClick={onPrev}>
                <ChevronLeft />
              </ChevronButton>
              <Indicator>
                {stationIndex}/{stationLength}
              </Indicator>
              <ChevronButton onClick={onNext}>
                <ChevronRight />
              </ChevronButton>
            </IndicatorWrapper>
          </ContentWrapper>
          <PreffertWrapper>
            <VoteWrapper>
              <VoteTitle>
                <Label>선호도 결과</Label>
                <Count>7표</Count>
              </VoteTitle>

              <LikeWrapper>
                {likeItems.map((item, index) => (
                  <LikeItem key={index}>
                    {item.isActive ? <LikeIconActive /> : <LikeIcon />}
                  </LikeItem>
                ))}
              </LikeWrapper>
            </VoteWrapper>
            <ButtonWrapper>
              <ButtonLine>
                좋아요
                <LikeIcon />
              </ButtonLine>
              <ButtonPrimary>확정하기</ButtonPrimary>
            </ButtonWrapper>
          </PreffertWrapper>
        </Body>
      </Container>
    </>
  );
}
