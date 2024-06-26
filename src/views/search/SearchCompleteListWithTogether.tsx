'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { ArrowBackIcon } from '@/assets/icons/ArrowBack';
import { useAtom } from 'jotai';
import { searchState } from '@/jotai/global/store';
import { useInputStatusListQuery } from '@/hooks/query/search';

export default function SearchCompleteListWithTogetherView() {
  const router = useRouter();

  const [searchList, setSearchList] = useAtom(searchState);

  const roomId = localStorage.getItem('roomId');

  const { data, isLoading } = useInputStatusListQuery(roomId || '');

  console.log('data', data);

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
