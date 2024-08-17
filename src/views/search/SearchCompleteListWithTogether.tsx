'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { Link, CirclePlus } from 'lucide-react';

import { ArrowBackIcon } from '@/assets/icons/ArrowBack';
import { searchState } from '@/jotai/global/store';
import { useInputStatusListQuery } from '@/hooks/query/search';
import PeopleCard from './components/PeopleCard';
import Button from '@/components/Button';

export default function SearchCompleteListWithTogetherView() {
  const router = useRouter();

  const [searchList, setSearchList] = useAtom(searchState);

  const roomId = localStorage.getItem('roomId');

  const { participant: participants } = useInputStatusListQuery(roomId || '');

  const handleInviteBtnClick = () => {};

  const handleAddBtnClick = () => {
    setSearchList(participants);
    router.push('/search/together');
  };

  return (
    <Container>
      <Wrapper>
        <IconBox onClick={() => router.back()}>
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
