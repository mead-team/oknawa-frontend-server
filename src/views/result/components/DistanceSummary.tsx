'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import { mapIdState } from '@/jotai/mapId/store';

import useDistanceSummary from '@/hooks/useDistanceSummary';
import useModal from '@/hooks/common/useModal';

import VoteService from '@/services/vote/VoteService';

import { convertToKoreanTime } from '@/utils/date';

import { ShareIcon } from '@/assets/icons/Share';
import { HomeIcon } from '@/assets/icons/Home';
import { ChevronLeft } from '@/assets/icons/ChevronLeft';
import { ChevronRight } from '@/assets/icons/ChevronRight';
import { LikeIcon } from '@/assets/icons/Like';
import { LikeIconInactive } from '@/assets/icons/LikeInactive';
import { LikeIconActive } from '@/assets/icons/LikeActive';

import {
  Container,
  ArrivalTime,
  AverageArrivalTime,
  Body,
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
import ButtonPrimary from '@/components/ButtonPrimary';
import Button from '@/components/Button';

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

  const { setModalContents } = useModal();

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

  const clickVote = async () => {
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
  const clickVoteConfirm = async () => {
    if (isButtonDisabled === false) {
      setModalContents({
        buttonLabel: '확인',
        contents: '아직 투표를 안하셨어요!',
      });
      return;
    } else {
      setModalContents({
        buttonLabel: '취소',
        buttonLabel02: '확인',
        contents: '진짜 이대로 확정하시겠어요?',
      });
      // confirmVote();
    }
  };

  const confirmVote = async () => {
    try {
      const result = await VoteService.setVoteConfirm(mapIdInfo, shareKey);
      console.error('confirm - result:', result);
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
                  {item.is_active ? <LikeIconActive /> : <LikeIconInactive />}
                </LikeItem>
              ))}
            </LikeWrapper>
          </VoteWrapper>
          <ButtonWrapper>
            <Button
              label={'좋아요'}
              onClick={clickVote}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? <LikeIconInactive /> : <LikeIcon />}
            </Button>
            <ButtonPrimary label={'확정하기'} onClick={clickVoteConfirm} />
          </ButtonWrapper>
        </PreffertWrapper>
      </Body>
    </Container>
  );
}
