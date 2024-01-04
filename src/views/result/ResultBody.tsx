'use client';

import { Button, useDisclosure } from '@nextui-org/react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';

import DistanceSummary from './components/DistanceSummary';
import HotPlaceModal from './components/HotPlaceModal';
import ResultMap from './components/ResultMap';

import { usePlaceSearchWithShareKeyQuery } from '@/hooks/query/search';

import { resultState } from '@/jotai/result/store';
import { bottomSheetState } from '@/jotai/global/store';

import { ArrowBackIcon } from '@/assets/icons/ArrowBack';

export default function ResultBody() {
  const router = useRouter();
  const searchParams = useSearchParams().get('sharekey');
  const [result, setResult] = useAtom(resultState);
  const setBottomSheet = useSetAtom(bottomSheetState);
  const { station_name } = result;
  const { data, isLoading } = usePlaceSearchWithShareKeyQuery(searchParams);

  const stationName = station_name.split(' ')[0];

  const handleBackBtnClick = () => {
    router.push('/');
  };

  const handleHotplaceBtnClick = () => {
    setBottomSheet(prevState => ({
      ...prevState,
      isOpen: true,
      title: (
        <div>
          <span style={{ fontWeight: '800' }}>{stationName}</span>의
          <div>핫플레이스를 추천해요!</div>
        </div>
      ),
      contents: <HotPlaceModal />,
    }));
  };

  const updateResultData = () => {
    if (data) {
      setResult(data);
    }
  };

  useEffect(() => {
    if (searchParams) {
      updateResultData();
    }
  }, [searchParams, data]);

  if (isLoading) return null;

  return (
    <Container>
      <Header>
        <BackButton isIconOnly aria-label="Back" onClick={handleBackBtnClick}>
          <ArrowBackIcon />
        </BackButton>
      </Header>
      <DistanceSummary />
      <ResultMap />
      <FloatingButton
        radius="full"
        size="lg"
        color="success"
        variant="shadow"
        onClick={handleHotplaceBtnClick}
      >
        {stationName} 핫플레이스는 어디?
      </FloatingButton>
    </Container>
  );
}

const Container = styled.main`
  position: relative;
  width: 100%;
`;

const FloatingButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const Header = styled.header`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  z-index: 10;
`;

const BackButton = styled(Button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
