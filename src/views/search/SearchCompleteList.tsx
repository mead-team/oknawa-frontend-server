'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import {
  usePlaceSearchMapIdMutation,
  usePlaceSearchMutation,
} from '@/hooks/mutation/search';

import styled from 'styled-components';

import Button from '@/components/Button';
import PeopleCard from './components/PeopleCard';
import SearchLoading from './components/SearchLoading';
import { ArrowBackIcon } from '@/assets/icons/ArrowBack';

import { useAtom, useSetAtom } from 'jotai';
import { searchState } from '@/jotai/global/store';

import { Button as FloatingButton } from '@nextui-org/react';

import { resultState } from '@/jotai/result/store';
import { mapIdState } from '@/jotai/mapId/store';

import { MapIdType } from '@/services/search/types';

export default function SearchCompleteList() {
  const router = useRouter();

  const [searchList] = useAtom(searchState);
  const setResult = useSetAtom(resultState);
  const setSearchState = useSetAtom(searchState);
  const setMapIdInfo = useSetAtom(mapIdState);

  const { mutate: placeSearchMutate } = usePlaceSearchMutation();
  const {
    mutate: placeSearchMapIdMutate,
    isPending,
    isSuccess,
  } = usePlaceSearchMapIdMutation();

  const handleSearchBtnClick = async () => {
    placeSearchMutate(searchList, {
      onSuccess: data => {
        const mapIdInfo: MapIdType = {
          mapId: data.map_id,
          mapHostId: data.map_host_id,
        };

        setMapIdInfo(mapIdInfo);

        placeSearchMapIdMutate(data.map_id, {
          onSuccess: mapData => {
            setSearchState(searchList);
            setResult(mapData);
            router.push('/result');
            localStorage.removeItem('isVote');
          },
          onError: error => {
            console.error('Error fetching map data:', error);
          },
        });
      },
    });
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
                iconClick={() => console.log('hello')}
              />
            );
          })}
        </Section>
        <Button
          label="출발지 추가하기 ⊕"
          $widthFull
          size="large"
          onClick={() => router.push('/search/individual')}
        />
      </Wrapper>
      <SubmitButton size="lg" color="success" onClick={handleSearchBtnClick}>
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

const SubmitButton = styled(FloatingButton)`
  font-weight: 600;
`;
