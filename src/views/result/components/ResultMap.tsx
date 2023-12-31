'use client';

import { useAtom, useAtomValue } from 'jotai';
import styled from 'styled-components';
import {
  CustomOverlayMap,
  Map as KakaoMap,
  MapMarker,
  Polyline,
} from 'react-kakao-maps-sdk';

import { searchState } from '@/jotai/global/store';
import { resultState } from '@/jotai/result/store';
import CenterMarker from './CenterMarker';
import { useEffect, useMemo, useRef } from 'react';

const getStrokeColor = (index: number) => {
  switch (index) {
    case 0:
      return '#2E7FFF';
    case 1:
      return '#8B5CCC';
    case 2:
      return '#FF46CB';
    case 3:
      return '#FF5D02';
    default:
      return '#2E7FFF';
  }
};

export default function ResultMap() {
  const mapRef = useRef<any>(null);

  const [result] = useAtom(resultState);
  const searchValue = useAtomValue(searchState);

  const polylines = result.itinerary.map(user => {
    return user.itinerary.total_polyline;
  });

  const stationName = result.station_name.split(' ')[0];

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();
    searchValue?.forEach(user => {
      const { latitude, longitude } = user.address;
      const position = new kakao.maps.LatLng(latitude, longitude);
      bounds.extend(position);
    });
    return bounds;
  }, [searchValue]);

  useEffect(() => {
    const map = mapRef.current;
    map?.setBounds(bounds);
  }, [bounds]);

  return (
    <>
      <MapCenter
        center={{ lat: result.end_y, lng: result.end_x }}
        level={3}
        ref={mapRef}
      >
        {searchValue?.map((user, index) => {
          return (
            <MapMarker
              key={index}
              position={{
                lat: user.address.latitude,
                lng: user.address.longitude,
              }}
              image={{
                src: `/images/marker${index}.svg`,
                size: { width: 30, height: 39 },
              }}
            />
          );
        })}
        <CustomOverlayMap position={{ lat: result.end_y, lng: result.end_x }}>
          <CenterMarker>{stationName}</CenterMarker>
        </CustomOverlayMap>
        {polylines.map((polyline, index) => {
          return (
            <Polyline
              key={index}
              path={polyline}
              strokeWeight={5}
              strokeOpacity={1}
              strokeColor="#18C964"
            />
          );
        })}
      </MapCenter>
    </>
  );
}

const MapCenter = styled(KakaoMap)`
  width: 100%;
  height: 100vh;
`;
