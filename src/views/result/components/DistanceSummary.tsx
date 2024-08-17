'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { mapIdState } from '@/jotai/mapId/store';
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
import styled from 'styled-components';

export default function DistanceSummary({
  station,
  stationName,
  shareKey,
  stationIndex,
  stationLength,
  stationParticipants,
  vote,
  onNext,
  onPrev,
}: any) {
  const router = useRouter();

  const [mapIdInfo] = useAtom(mapIdState);
  const setResultConfirm = useSetAtom(resultConfirmState);
  const reset = useResetAtom(modalState);

  const [fullUrl, setFullUrl] = useState('');
  const [isExpandTail, setExpandTail] = useState(true);

  const queryMapId = useSearchParams().get('mapId');

  const { setModalContents } = useModal();

  const { mutate: placeSearchWithShareKey } =
    usePlaceSearchWithShareKeyMutation();

  const isVote = localStorage.getItem('isVote') === 'true';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullUrl(window.location.href);
    }
  }, []);

  const clickInvitation = async () => {
    if (queryMapId) {
      const link = `${fullUrl}`;
      try {
        await navigator.clipboard.writeText(link);
        setModalContents({
          buttonLabel: '확인',
          contents: '링크가 복사되었습니다!',
        });
      } catch (err) {
        console.error('클립보드에 복사 실패:', err);
      }
    } else {
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
    }
  };

  const clickVote = async () => {
    if (!isVote) {
      setModalContents({
        buttonLabel: '취소',
        buttonLabel02: '투표하기',
        contents: '투표하시겠어요?\n수정이 불가능합니다.',
        onConfirm: handleVote,
      });
    }
  };
  const handleVote = async () => {
    reset();
    try {
      await VoteService.setVote(
        (mapIdInfo.mapId || queryMapId) ?? '',
        shareKey,
      );
    } catch (error) {
      console.error('Error voting:', error);
    }
    localStorage.setItem('isVote', 'true');
  };

  const clickVoteConfirm = async () => {
    if (!isVote) {
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
        localStorage.removeItem('isVote');
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

  const voteCount = Array(stationParticipants.length)
    .fill(true, 0, vote)
    .fill(false, vote);

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
                <Count>{vote}표</Count>
              </VoteTitle>
              <LikeWrapper>
                {voteCount.map((item: boolean, index: number) => (
                  <LikeItem key={index}>
                    {item ? <LikeIconActive /> : <LikeIconInactive />}
                  </LikeItem>
                ))}
              </LikeWrapper>
            </VoteWrapper>
            <ButtonWrapper>
              <LikeButtonWithVote
                label={'좋아요'}
                onClick={clickVote}
                isVote={isVote}
              >
                {isVote ? <LikeIconActive /> : <LikeIconInactive />}
              </LikeButtonWithVote>
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
                    <Count>{vote}표</Count>
                  </FoldLabel>
                </FoldLabelWrapper>
              </TitleWrapper>
            </LeftWrapper>
            <RightWrapper>
              <ButtonWrapper>
                <LikeButton onClick={clickVote}>
                  {isVote ? <LikeIconActive /> : <LikeIconInactive />}
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

const LikeButtonWithVote = styled(Button)<{ isVote: boolean }>`
  border: ${({ isVote }) =>
    isVote ? '1px solid var(--primary)' : '1px solid #777780'};
  color: ${({ isVote }) => (isVote ? ' var(--primary)' : '#777780')};
`;
