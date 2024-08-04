'use client';

import { use, useEffect, useState } from 'react';

import {
  usePlaceSearchMapIdQuery,
  usePlaceSearchWithShareKeyQuery,
} from '@/hooks/query/search';

import useDistanceSummary from '@/hooks/useDistanceSummary';
import { usePlaceSearchMapIdMutation } from '@/hooks/mutation/search';

import { useAtom, useSetAtom } from 'jotai';
import { resultState, shareKeyState } from '@/jotai/result/store';
import { mapIdState } from '@/jotai/mapId/store';
import { bottomSheetState } from '@/jotai/global/store';

import styled from 'styled-components';
import DistanceSummary from './components/DistanceSummary';
import HotPlaceModal from './components/HotPlaceModal';
import ResultMap from './components/ResultMap';

import { useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/react';

import { MapIdType } from '@/services/search/types';

export default function ResultBody() {
  // const shareKey = useSearchParams().get('sharekey');

  const queryMapId = useSearchParams().get('mapId');
  const queryMapHostId = useSearchParams().get('mapHostId');

  const setBottomSheet = useSetAtom(bottomSheetState);
  const setResult = useSetAtom(resultState);
  const setConfirmedShareKey = useSetAtom(shareKeyState);
  const [mapId] = useAtom(mapIdState);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { distanceSummaries, participants } = useDistanceSummary();

  const currentStation = distanceSummaries[currentIndex];

  const { mutate: placeSearchMapIdMutate } = usePlaceSearchMapIdMutation();

  const { data, isLoading, clearRefetchInterval } =
    usePlaceSearchMapIdQuery(mapId);

  console.log('mapId:', mapId);

  useEffect(() => {
    if (data?.confirmed) {
      setConfirmedShareKey(data.confirmed);
      clearRefetchInterval();
    }
  }, [data, setConfirmedShareKey, clearRefetchInterval]);

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
      height: 60,
    }));
  };

  // 공유하기로 확인할 최종 장소 페이지
  // useEffect(() => {
  //   if (shareKey && data) {
  //     console.log('shareKey 분기의 data:', data);
  //     setResult(data);
  //   }
  // }, [shareKey, data, setResult]);

  // useEffect(() => {
  //   if (data?.confirmed) {
  //     console.log('shareKey:', data?.confirmed);
  //     const shareKey = data?.confirmed;
  //   }
  // });

  // useEffect(() => {
  //   placeSearchMapIdMutate(mapId, {
  //     onSuccess: mapData => {
  //       setResult(mapData);
  //     },
  //     onError: error => {
  //       console.error('Error fetching map data:', error);
  //     },
  //   });
  // }, [mapId, placeSearchMapIdMutate, setResult]);

  useEffect(() => {
    if (queryMapId) {
      console.log('queryMapId:', queryMapId);
      console.log('queryMapHostId:', queryMapHostId);

      const mapIdInfo: MapIdType = {
        mapId: queryMapId ?? '',
        mapHostId: queryMapHostId ?? '',
      };

      placeSearchMapIdMutate(mapIdInfo, {
        onSuccess: mapData => {
          setResult(mapData);
        },
        onError: error => {
          console.error('Error fetching map data:', error);
        },
      });
    }
  }, [queryMapId, queryMapHostId, placeSearchMapIdMutate, setResult]);

  return (
    <>
      <Container>
        <DistanceSummary
          station={currentStation}
          stationIndex={`0${currentIndex + 1}`}
          stationLength={`0${distanceSummaries.length}`}
          stationName={currentStation.stationName}
          participants={participants}
          stationParticipants={currentStation.stationParticipants}
          shareKey={currentStation.shareKey}
          onNext={handleNext}
          onPrev={handlePrev}
        />
        <ResultMap
          station={currentStation}
          participants={participants}
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
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  z-index: 2;
`;
