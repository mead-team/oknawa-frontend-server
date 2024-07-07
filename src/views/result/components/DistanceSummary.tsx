'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

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

import VoteService from '@/services/vote/VoteService';
import { mapIdState } from '@/jotai/mapId/store';

export default function DistanceSummary({
  station,
  stationName,
  shareKey,
  stationIndex,
  stationLength,
  participants,
  onNext,
  onPrev,
}: any) {
  const router = useRouter();
  const { initKakao, kakaoShareSendDefault } = useDistanceSummary();
  const [mapIdInfo] = useAtom(mapIdState);

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [newParticipants, setNewParticipants] = useState<any[]>([]);

  useEffect(() => {
    const processParticipants = (participants: any) =>
      participants.map((participant: any) => ({
        name: participant.name,
        is_active: false,
      }));

    if (participants && participants.length > 0) {
      setNewParticipants(processParticipants(participants));
    }
  }, [participants]);

  const handleKakaoSharingBtnClick = (stationName: any, shareKey: any) => {
    initKakao();
    kakaoShareSendDefault(stationName, shareKey);
  };

  const handleVoteClick = async () => {
    try {
      const result = await VoteService.setVote(mapIdInfo, shareKey);

      if (isButtonDisabled) return;

      setButtonDisabled(true);

      const updatedParticipants = [...participants];
      updatedParticipants[0].is_active = true;
      setNewParticipants(updatedParticipants);
    } catch (error) {
      console.error('Error voting:', error);
    }
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
              <Count>{newParticipants.length}표</Count>
            </VoteTitle>

            <LikeWrapper>
              {newParticipants.map((item: any, index: number) => (
                <LikeItem key={index}>
                  {item.is_active ? <LikeIconActive /> : <LikeIcon />}
                </LikeItem>
              ))}
            </LikeWrapper>
          </VoteWrapper>
          <ButtonWrapper>
            <ButtonLine
              onClick={handleVoteClick}
              style={{
                backgroundColor: isButtonDisabled ? '#D3D3D3' : 'initial',
                cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                pointerEvents: isButtonDisabled ? 'none' : 'auto',
              }}
            >
              좋아요
              <LikeIcon />
            </ButtonLine>
            <ButtonPrimary>확정하기</ButtonPrimary>
          </ButtonWrapper>
        </PreffertWrapper>
      </Body>
    </Container>
  );
}
