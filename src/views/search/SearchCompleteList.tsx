'use client';

import { useRouter } from 'next/navigation';

import { usePlaceSearchMutation } from '@/hooks/mutation/search';
import styled from 'styled-components';
import { ArrowBackIcon } from '@/assets/icons/ArrowBack';
import PeopleCard from './components/PeopleCard';
import Button from '@/components/Button';
import { useAtom, useSetAtom } from 'jotai';
import { searchState } from '@/jotai/global/store';

import { Button as FloatingButton } from '@nextui-org/react';
import { resultState } from '@/jotai/result/store';
import { useEffect } from 'react';
import SearchLoading from './components/SearchLoading';

export default function SearchCompleteList() {
  const router = useRouter();

  const [searchList, setSearchList] = useAtom(searchState);
  const setResult = useSetAtom(resultState);

  const {
    mutate: placeSearchMutate,
    isPending,
    isSuccess,
  } = usePlaceSearchMutation();

  const handleSearchBtnClick = () => {
    placeSearchMutate(searchList, {
      onSuccess: data => {
        router.push('/result');
        setResult(data);
      },
    });
  };

  const handleDeleteIconClick = (index: number) => {
    setSearchList(prevList => prevList.filter((_, i) => i !== index));
  };

  const handleModifyIconClick = () => {
    console.log('handleModifyIconClick');
  };

  useEffect(() => {
    const image = new Image();
    image.src = '/loading.gif';
  }, []);

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
          </TitleBox>
          {searchList.map((search, index) => {
            return (
              <PeopleCard
                key={index}
                name={search.name}
                place={search.address.regionName}
                onDeleteIconClick={() => handleDeleteIconClick(index)}
                onModifyIconClick={handleModifyIconClick}
              />
            );
          })}
        </Section>
        <Button
          label="출발지 추가하기 ⊕"
          onClick={() => router.push('/search/individual')}
        />
      </Wrapper>
      <SubmitButton
        size="lg"
        color="success"
        onClick={handleSearchBtnClick}
        isDisabled={searchList.length < 2}
      >
        이대로 추천 받기
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
  min-height: 100dvh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
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

const SubmitButton = styled(FloatingButton)`
  margin-top: 10px;
  font-weight: 600;
`;
