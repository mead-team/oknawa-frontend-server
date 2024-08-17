'use client';

import { useEffect } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { bottomSheetState } from '@/jotai/global/store';

import styled from 'styled-components';
import DistanceSummary from './components/DistanceSummary';
import HotPlaceModal from './components/HotPlaceModal';
import ResultMap from './components/ResultMap';

import { useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/react';

import { usePlaceSearchWithShareKeyMutation } from '@/hooks/mutation/search';
import { resultConfirmState } from '@/jotai/result-confirm/store';

export default function ResultConfirmBody() {
  const shareKey = useSearchParams().get('sharekey');

  const setBottomSheet = useSetAtom(bottomSheetState);
  const [resultConfirm, setResultConfirm] = useAtom(resultConfirmState);

  const { mutate: placeSearchWithShareKey } =
    usePlaceSearchWithShareKeyMutation();

  const totalTravelTime = resultConfirm?.itinerary.reduce(
    (sum, itinerary) => sum + itinerary.itinerary.totalTime,
    0,
  );
  const averageTravelTime = totalTravelTime / resultConfirm?.itinerary.length;

  const handleHotplaceBtnClick = (station: any) => {
    setBottomSheet(prevState => ({
      ...prevState,
      isOpen: true,
      title: (
        <>
          <span style={{ fontWeight: '800' }}>{station.station_name}</span>의
          <div>핫플레이스를 추천해요!</div>
        </>
      ),
      contents: <HotPlaceModal station={station} />,
      height: 60,
    }));
  };

  useEffect(() => {
    if (shareKey && resultConfirm.station_name === '') {
      placeSearchWithShareKey(shareKey, {
        onSuccess: data => {
          setResultConfirm(data);
        },
        onError: error => {
          console.error('Error fetching shareKey result data:', error);
        },
      });
    }
  }, [shareKey, resultConfirm, placeSearchWithShareKey, setResultConfirm]);

  return (
    <>
      <Container>
        <DistanceSummary
          stationName={resultConfirm?.station_name}
          shareKey={resultConfirm?.share_key}
          averageTravelTime={averageTravelTime}
        />
        <ResultMap
          participants={resultConfirm?.request_info?.participant}
          itinerary={resultConfirm?.itinerary}
          stationName={resultConfirm?.station_name}
          end_x={resultConfirm?.end_x}
          end_y={resultConfirm?.end_y}
        />

        <FloatingButton
          radius="full"
          size="lg"
          color="success"
          variant="shadow"
          onClick={() => handleHotplaceBtnClick(resultConfirm)}
        >
          {resultConfirm?.station_name} 핫플레이스는 어디?
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
