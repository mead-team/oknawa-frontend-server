'use client';

import { useEffect, useState } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { shareKeyState } from '@/jotai/result/store';
import { bottomSheetState } from '@/jotai/global/store';

import styled from 'styled-components';
import DistanceSummary from './components/DistanceSummary';
import HotPlaceModal from './components/HotPlaceModal';
import ResultMap from './components/ResultMap';

import { useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { usePlaceSearchWithShareKeyMutation } from '@/hooks/mutation/search';

export default function ResultConfirmBody() {
  const shareKey = useSearchParams().get('sharekey');

  const setBottomSheet = useSetAtom(bottomSheetState);
  const [data, setData] = useState();

  const [confirmShareKey] = useAtom(shareKeyState);
  console.log('shareKey state:', confirmShareKey);
  console.log('url shareKey:', shareKey);

  const { mutate: placeSearchWithShareKey } =
    usePlaceSearchWithShareKeyMutation();

  useEffect(() => {
    if (shareKey) {
      placeSearchWithShareKey(shareKey, {
        onSuccess: data => {
          setData(data);
        },
        onError: error => {
          console.error('Error fetching map data:', error);
        },
      });
    } else {
      placeSearchWithShareKey(confirmShareKey, {
        onSuccess: data => {
          setData(data);
        },
        onError: error => {
          console.error('Error fetching map data:', error);
        },
      });
    }
  }, [placeSearchWithShareKey, shareKey, confirmShareKey]);

  const totalTravelTime = data?.itinerary.reduce(
    (sum, itinerary) => sum + itinerary.itinerary.totalTime,
    0,
  );
  const averageTravelTime = totalTravelTime / data?.itinerary.length;

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

  return (
    <>
      <Container>
        <DistanceSummary
          stationName={data?.station_name}
          shareKey={data?.share_key}
          averageTravelTime={averageTravelTime}
        />
        <ResultMap
          participants={data?.request_info?.participant}
          itinerary={data?.itinerary}
          stationName={data?.station_name}
          end_x={data?.end_x}
          end_y={data?.end_y}
        />

        <FloatingButton
          radius="full"
          size="lg"
          color="success"
          variant="shadow"
          onClick={() => handleHotplaceBtnClick(data)}
        >
          {data?.station_name} 핫플레이스는 어디?
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
