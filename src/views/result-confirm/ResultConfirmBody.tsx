'use client';

import { useEffect, useState } from 'react';

import useDistanceSummary from '@/hooks/useDistanceSummary';
import { usePlaceSearchWithShareKeyQuery } from '@/hooks/query/search';

import { useAtom, useSetAtom } from 'jotai';
import { resultState, shareKeyState } from '@/jotai/result/store';
import { bottomSheetState } from '@/jotai/global/store';

import styled from 'styled-components';
import DistanceSummary from '../result/components/DistanceSummary';
import HotPlaceModal from '../result/components/HotPlaceModal';
import ResultMap from '../result/components/ResultMap';

import { useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/react';

export default function ResultConfirmBody() {
  // const shareKey = useSearchParams().get('sharekey');

  const setBottomSheet = useSetAtom(bottomSheetState);
  const setResult = useSetAtom(resultState);
  const [shareKey] = useAtom(shareKeyState);
  console.log('shareKey state:', shareKey);

  const { data } = usePlaceSearchWithShareKeyQuery(shareKey);

  console.log('shareKey data:', data);

  const { distanceSummaries, participants } = useDistanceSummary();

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

  return (
    <>
      {/* <div>{shareKey}</div> */}
      <Container>
        <DistanceSummary
          // station={data.station.name}
          stationName={data.station_name}
          participants={data.itinerary}
          // stationParticipants={currentStation.stationParticipants}
          shareKey={data.share_key}
        />
        {/* <ResultMap
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
        </FloatingButton> */}
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
