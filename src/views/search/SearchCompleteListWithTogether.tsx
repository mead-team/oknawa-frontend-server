'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useSetAtom } from 'jotai';
import { Link, CirclePlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button as FloatingButton } from '@nextui-org/react';

import { ArrowBackIcon } from '@/assets/icons/ArrowBack';
import { searchState } from '@/jotai/global/store';
import { useInputStatusListQuery } from '@/hooks/query/search';
import PeopleCard from './components/PeopleCard';
import Button from '@/components/Button';
import { baseUrl } from '@/hooks/useDistanceSummary';
import SearchLoading from './components/SearchLoading';
import { usePlaceSearchMutation } from '@/hooks/mutation/search';
import { resultState } from '@/jotai/result/store';
import { useEffect, useState } from 'react';

export default function SearchCompleteListWithTogetherView() {
  const router = useRouter();

  const setSearchList = useSetAtom(searchState);
  const setResult = useSetAtom(resultState);
  const [roomId, setRoomId] = useState('');
  const [hostKey, setHostKey] = useState('');

  const { participant: participants } = useInputStatusListQuery(roomId || '');
  const {
    mutate: placeSearchMutate,
    isPending,
    isSuccess,
  } = usePlaceSearchMutation();

  const handleInviteBtnClick = () => {
    navigator.clipboard
      .writeText(`${baseUrl}/search/together?roomId=${roomId}`)
      .then(() => {
        toast.success('링크가 복사되었습니다.');
      });
  };

  const handleAddBtnClick = () => {
    if (!hostKey) {
      return toast.error('방장의 권한입니다.');
    }

    setSearchList(participants);
    router.push('/search/together');
  };

  const handleSearchBtnClick = () => {
    if (!hostKey) {
      return toast.error('방장의 권한입니다.');
    }

    placeSearchMutate(participants, {
      onSuccess: data => {
        router.push('/result');
        setResult(data);
      },
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const roomId = localStorage.getItem('roomId');
      const hostKey = localStorage.getItem('hostKey');

      setRoomId(roomId as string);
      setHostKey(hostKey as string);
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        <IconBox onClick={() => router.push('/')}>
          <ArrowBackIcon />
        </IconBox>
        <Section>
          <TitleBox>
            <Title>입력이 완료된</Title>
            <Title>출발지 목록입니다.</Title>
            <Desc>링크를 공유하고 팀원들을 초대해보세요.</Desc>
          </TitleBox>
        </Section>
        <div className="flex flex-col gap-3">
          {participants?.map((participant: any, index: number) => {
            return (
              <PeopleCard
                key={index}
                name={participant.name}
                place={participant.region_name}
                index={index}
                type="together"
                isKing={Boolean(hostKey)}
              />
            );
          })}
        </div>
        <ButtonWrapper>
          <Button
            label="추가하기"
            onClick={handleAddBtnClick}
            className="flex items-center flex-1"
          >
            <CirclePlus width={20} height={20} />
          </Button>
          <Button
            label="초대하기"
            className="flex items-center flex-1"
            onClick={handleInviteBtnClick}
          >
            <Link width={20} height={20} />
          </Button>
        </ButtonWrapper>
      </Wrapper>
      <SubmitButton
        size="lg"
        color="success"
        onClick={handleSearchBtnClick}
        isDisabled={participants?.length < 2}
      >
        만나기 편한 장소 추천받기
      </SubmitButton>
      {(isPending || isSuccess) && <SearchLoading />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 35px 19px 20px;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-top: 50px;
  padding-bottom: 120px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 20px;
`;

const IconBox = styled.div`
  width: 50px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  line-height: 43px;
`;

const Desc = styled.p`
  margin-top: 5px;
  color: #8d8d94;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const SubmitButton = styled(FloatingButton)`
  font-weight: 600;
`;
