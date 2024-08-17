'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { mapIdState } from '@/jotai/mapId/store';
import { newParticipantsState } from '@/jotai/result/store';
import { resultConfirmState } from '@/jotai/result-confirm/store';
import { modalState } from '@/jotai/global/store';

import { useResetAtom } from 'jotai/utils';

import { usePlaceSearchWithShareKeyMutation } from '@/hooks/mutation/search';
import useModal from '@/hooks/common/useModal';

import VoteService from '@/services/vote/VoteService';

import { ShareIcon } from '@/assets/icons/Share';
import { HomeIcon } from '@/assets/icons/Home';
import { ChevronLeft } from '@/assets/icons/ChevronLeft';
import { ChevronRight } from '@/assets/icons/ChevronRight';
import { LikeIconInactive } from '@/assets/icons/LikeInactive';
import { LikeIconActive } from '@/assets/icons/LikeActive';

import { ChevronBottom } from '@/assets/icons/ChevronBottom';
import { ChevronTop } from '@/assets/icons/ChevronTop';
import { Clock } from '@/assets/icons/Clock';
import { Check } from '@/assets/icons/Check';

import ButtonPrimary from '@/components/ButtonPrimary';
import Button from '@/components/Button';

import { convertToKoreanTime } from '@/utils/date';

import {
  Container,
  ArrivalTime,
  AverageArrivalTime,
  ExpandBody,
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
  Tail,
  TailWrapper,
  FoldBody,
  FoldLabel,
  FoldLabelWrapper,
  DividerVertical,
  ChevronWrapper,
  LeftWrapper,
  RightWrapper,
  LikeButton,
  ConfirmButton,
} from '../style';

export default function DistanceSummary({
  station,
  stationName,
  shareKey,
  stationIndex,
  stationLength,
  stationParticipants,
  onNext,
  onPrev,
}: any) {
  const router = useRouter();

  const [mapIdInfo] = useAtom(mapIdState);

  const [fullUrl, setFullUrl] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isExpandTail, setExpandTail] = useState(true);

  const [newParticipants, setNewParticipants] = useAtom(newParticipantsState);

  const reset = useResetAtom(modalState);
  const setResultConfirm = useSetAtom(resultConfirmState);

  const queryMapId = useSearchParams().get('mapId');

  const { setModalContents } = useModal();

  const { mutate: placeSearchWithShareKey } =
    usePlaceSearchWithShareKeyMutation();

  useEffect(() => {
    const processParticipants = (participants: any) =>
      participants.map((participant: any) => ({
        name: participant.name,
        is_active: false,
      }));

    if (stationParticipants && stationParticipants.length > 0) {
      setNewParticipants(processParticipants(stationParticipants));
    }
  }, [stationParticipants, setNewParticipants]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullUrl(window.location.href);
    }
  }, []);

  const clickInvitation = async () => {
    const link = `${fullUrl}?mapId=${mapIdInfo.mapId}`;
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

  const clickVote = async () => {
    try {
      await VoteService.setVote(
        (mapIdInfo.mapId || queryMapId) ?? '',
        shareKey,
      );

      setButtonDisabled(!isButtonDisabled);

      const updatedParticipants = [...newParticipants];
      updatedParticipants[0].is_active = !updatedParticipants[0].is_active;
      setNewParticipants(updatedParticipants);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const clickVoteConfirm = async () => {
    if (isButtonDisabled === true) {
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
        onConfirm: handleVoteConfirm,
      });
    }
  };

  const moveToFinal = () => {
    placeSearchWithShareKey(shareKey, {
      onSuccess: data => {
        setResultConfirm(data);
      },
      onError: error => {
        console.error('Error fetching map data:', error);
      },
    });
    router.replace('/result/confirm');
    reset();
  };

  const handleVoteConfirm = async () => {
    try {
      const result = await VoteService.setVoteConfirm(mapIdInfo, shareKey);

      console.error('confirm - result:', result);
      setModalContents({
        buttonLabel: '확인',
        contents: '이번 약속 지역이 확정되었어요!',
        onConfirm: moveToFinal,
      });
    } catch (error) {
      console.error('Error voting:', error);
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

  const clickTail = () => {
    setExpandTail(!isExpandTail);
  };

  return (
    <Container>
      <Header>
        <HomeButton onClick={clickHome}>
          <HomeIcon />
        </HomeButton>
        <SharingButton onClick={clickInvitation}>
          <ShareIcon />
          초대하기
        </SharingButton>
      </Header>
      {isExpandTail ? (
        <ExpandBody>
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
                <Count>
                  {newParticipants?.filter(item => item.is_active).length || 0}
                  표
                </Count>
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
                style={{
                  border: isButtonDisabled
                    ? '1px solid #777780'
                    : '1px solid var(--primary)',
                  color: isButtonDisabled ? '#777780' : 'var(--primary)',
                }}
              >
                {isButtonDisabled ? <LikeIconInactive /> : <LikeIconActive />}
              </Button>
              {mapIdInfo.mapHostId && (
                <ButtonPrimary label={'확정하기'} onClick={clickVoteConfirm} />
              )}
            </ButtonWrapper>
          </PreffertWrapper>
        </ExpandBody>
      ) : (
        <FoldBody>
          <ContentWrapper $isExpand={isExpandTail}>
            <LeftWrapper>
              <ChevronWrapper onClick={onPrev}>
                <ChevronLeft />
              </ChevronWrapper>
              <TitleWrapper>
                <StationName $isExpand={isExpandTail}>
                  {stationName}
                </StationName>
                <FoldLabelWrapper>
                  <FoldLabel>
                    <Clock />
                    <ArrivalTime $isExpand={isExpandTail}>
                      {convertToKoreanTime(station.averageTravelTime)}
                    </ArrivalTime>
                  </FoldLabel>
                  <DividerVertical />
                  <FoldLabel>
                    <LikeIconInactive />
                    <Count>
                      {newParticipants?.filter(item => item.is_active).length ||
                        0}
                      표
                    </Count>
                  </FoldLabel>
                </FoldLabelWrapper>
              </TitleWrapper>
            </LeftWrapper>
            <RightWrapper>
              <ButtonWrapper>
                <LikeButton onClick={clickVote}>
                  {isButtonDisabled ? <LikeIconInactive /> : <LikeIconActive />}
                </LikeButton>
                {mapIdInfo.mapHostId && (
                  <ConfirmButton onClick={clickVoteConfirm}>
                    <Check />
                  </ConfirmButton>
                )}
              </ButtonWrapper>
              <ChevronWrapper onClick={onNext}>
                <ChevronRight />
              </ChevronWrapper>
            </RightWrapper>
          </ContentWrapper>
        </FoldBody>
      )}

      <TailWrapper>
        <Tail onClick={clickTail}>
          {isExpandTail ? <ChevronTop /> : <ChevronBottom />}
        </Tail>
      </TailWrapper>
    </Container>
  );
}
