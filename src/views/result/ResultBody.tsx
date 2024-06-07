'use client';

import { Button } from '@nextui-org/react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import useDistanceSummary from '@/hooks/useDistanceSummary';

import DistanceSummary from './components/DistanceSummary';
import HotPlaceModal from './components/HotPlaceModal';
import ResultMap from './components/ResultMap';

import { usePlaceSearchWithShareKeyQuery } from '@/hooks/query/search';

import { resultState } from '@/jotai/result/store';
import { bottomSheetState } from '@/jotai/global/store';

import { ArrowBackIcon } from '@/assets/icons/ArrowBack';

export default function ResultBody() {
  const router = useRouter();
  const shareKey = useSearchParams().get('sharekey');

  const { distanceSummaries } = useDistanceSummary();

  const setBottomSheet = useSetAtom(bottomSheetState);

  const [result, setResult] = useAtom(resultState);

  // const stationName = result?.station_info.station_name.split(' ')[0];

  const { data } = usePlaceSearchWithShareKeyQuery(shareKey);

  // const handleHotplaceBtnClick = () => {
  //   setBottomSheet(prevState => ({
  //     ...prevState,
  //     isOpen: true,
  //     title: (
  //       <>
  //         {/* <span style={{ fontWeight: '800' }}>테스트역</span>의 */}
  //         <span style={{ fontWeight: '800' }}>{stationName}</span>의
  //         <div>핫플레이스를 추천해요!</div>
  //       </>
  //     ),
  //     contents: <HotPlaceModal />,
  //     height: 70,
  //   }));
  // };

  useEffect(() => {
    if (shareKey && data) {
      setResult(data);
    }
  }, [shareKey, data, setResult]);

  return (
    <Container>
      <Header>
        <BackButton
          isIconOnly
          aria-label="Back"
          onClick={() => router.push('/')}
        >
          <ArrowBackIcon />
        </BackButton>
      </Header>
      {distanceSummaries?.map(station => {
        return (
          <>
            <DistanceSummary />
            <ResultMap
              station={station}
              participants={station.participants}
              itinerary={station.itinerary}
              stationName={station.stationName}
            />
            {/* <FloatingButton
        radius="full"
        size="lg"
        color="success"
        variant="shadow"
        onClick={handleHotplaceBtnClick}
      >
        {stationName} 핫플레이스는 어디?
      </FloatingButton> */}
          </>
        );
      })}
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
  font-weight: 600;
  z-index: 10;
`;

const Header = styled.header`
  position: absolute;
  top: 15px;
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
