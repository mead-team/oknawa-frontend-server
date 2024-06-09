'use client';

import { useEffect } from 'react';

import useDistanceSummary from '@/hooks/useDistanceSummary';
import { usePlaceSearchWithShareKeyQuery } from '@/hooks/query/search';

import { useAtom, useSetAtom } from 'jotai';
import { resultState } from '@/jotai/result/store';
import { bottomSheetState } from '@/jotai/global/store';

import styled from 'styled-components';
import DistanceSummary from './components/DistanceSummary';
import HotPlaceModal from './components/HotPlaceModal';
import ResultMap from './components/ResultMap';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/react';

import { ArrowBackIcon } from '@/assets/icons/ArrowBack';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

export default function ResultBody() {
  const router = useRouter();
  const shareKey = useSearchParams().get('sharekey');

  const [result, setResult] = useAtom(resultState);

  // const stationName = result?.station_info.station_name.split(' ')[0];

  const { data } = usePlaceSearchWithShareKeyQuery(shareKey);

  const { distanceSummaries } = useDistanceSummary();

  const setBottomSheet = useSetAtom(bottomSheetState);

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
            <Swiper
              spaceBetween={12}
              centeredSlides={true}
              className="mySwiper"
            >
              <SwiperSlide>
                <DistanceSummary />
              </SwiperSlide>
              <SwiperSlide>
                <DistanceSummary />
              </SwiperSlide>
              <SwiperSlide>
                <DistanceSummary />
              </SwiperSlide>
            </Swiper>

            <ResultMap
              station={station}
              participants={station.participants}
              itinerary={station.itinerary}
              stationName={station.stationName}
            />
            <FloatingButton
              radius="full"
              size="lg"
              color="success"
              variant="shadow"
              onClick={() => handleHotplaceBtnClick(station)}
            >
              {station.stationName} 핫플레이스는 어디?
            </FloatingButton>
          </>
        );
      })}
    </Container>
  );
}

const Container = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
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
