'use client';

import { useEffect, useState } from 'react';

import useDistanceSummary from '@/hooks/useDistanceSummary';
import { usePlaceSearchWithShareKeyQuery } from '@/hooks/query/search';

import { useAtom, useSetAtom } from 'jotai';
import { resultState } from '@/jotai/result/store';
import { bottomSheetState } from '@/jotai/global/store';

import styled from 'styled-components';
import DistanceSummary from './components/DistanceSummary';
import HotPlaceModal from './components/HotPlaceModal';
import ResultMap from './components/ResultMap';

import { useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/react';

export default function ResultBody() {
  const shareKey = useSearchParams().get('sharekey');

  const [result, setResult] = useAtom(resultState);
  const setBottomSheet = useSetAtom(bottomSheetState);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { data } = usePlaceSearchWithShareKeyQuery(shareKey);
  const { distanceSummaries } = useDistanceSummary();

  const currentStation = distanceSummaries[currentIndex];

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % distanceSummaries.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      prevIndex =>
        (prevIndex - 1 + distanceSummaries.length) % distanceSummaries.length,
    );
  };

  const handleHotplaceBtnClick = (station: any) => {
    setBottomSheet(prevState => ({
      ...prevState,
      isOpen: true,
      title: (
        <>
          <span style={{ fontWeight: '800' }}>{station.stationName}</span>의
          <div>핫플레이스를 추천해요!</div>
        </>
      ),
      contents: <HotPlaceModal station={station} />,
      height: 70,
    }));
  };

  useEffect(() => {
    if (shareKey && data) {
      setResult(data);
    }
  }, [shareKey, data, setResult]);

  return (
    <>
      <Container>
        <DistanceSummary
          station={currentStation}
          stationIndex={`0${currentIndex + 1}`}
          stationLength={`0${distanceSummaries.length}`}
          stationName={currentStation.stationName}
          shareKey={currentStation.shareKey}
          onNext={handleNext}
          onPrev={handlePrev}
        />
        <ResultMap
          station={currentStation}
          participants={currentStation.participants}
          itinerary={currentStation.itinerary}
          stationName={currentStation.stationName}
        />
        <FloatingButton
          radius="full"
          size="lg"
          color="success"
          variant="shadow"
          onClick={() => handleHotplaceBtnClick(currentStation)}
        >
          {currentStation.stationName} 핫플레이스는 어디?
        </FloatingButton>
      </Container>
    </>
  );
}

const Container = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const FloatingButton = styled(Button)`
  position: fixed;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  z-index: 100;
`;
