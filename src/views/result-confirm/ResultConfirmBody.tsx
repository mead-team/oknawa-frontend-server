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

  const { station_name, share_key, itinerary, request_info, end_x, end_y } =
    resultConfirm;

  const totalTravelTime = itinerary.reduce(
    (sum, itinerary) => sum + itinerary.itinerary.totalTime,
    0,
  );
  const averageTravelTime = totalTravelTime / itinerary.length;
  const stationName = station_name.split(' ')[0];

  const handleHotplaceBtnClick = (station: any) => {
    setBottomSheet(prevState => ({
      ...prevState,
      isOpen: true,
      title: (
        <>
          <span style={{ fontWeight: '800' }}>{stationName}</span>의
          <div>핫플레이스를 추천해요!</div>
        </>
      ),
      contents: <HotPlaceModal station={station} />,
      height: 60,
    }));
  };

  useEffect(() => {
    if (shareKey && station_name === '') {
      placeSearchWithShareKey(shareKey, {
        onSuccess: data => {
          setResultConfirm(data);
        },
        onError: error => {
          console.error('Error fetching shareKey result data:', error);
        },
      });
    }
  }, [shareKey, station_name, placeSearchWithShareKey, setResultConfirm]);

  return (
    <>
      <Container>
        <DistanceSummary
          stationName={stationName}
          shareKey={share_key}
          averageTravelTime={averageTravelTime}
        />
        <ResultMap
          participants={request_info?.participant}
          itinerary={itinerary}
          stationName={station_name}
          end_x={end_x}
          end_y={end_y}
        />

        <FloatingButton
          radius="full"
          size="lg"
          color="success"
          variant="shadow"
          onClick={() => handleHotplaceBtnClick(resultConfirm)}
        >
          {stationName} 핫플레이스는 어디?
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
