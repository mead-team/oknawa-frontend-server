'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import {
  CustomOverlayMap,
  Map as KakaoMap,
  MapMarker,
  Polyline,
} from 'react-kakao-maps-sdk';

import CenterMarker from './CenterMarker';

import { resultState } from '@/jotai/result/store';

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAOMAP_APP_KEY;

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
  const resultValue = useAtomValue(resultState);
  const [loaded, setLoaded] = useState(false);
  const [map, setMap] = useState<kakao.maps.Map | undefined>(undefined);

  const participants = resultValue?.request_info?.participant;

  const polylines = resultValue.itinerary.map(user => {
    return user.itinerary.total_polyline;
  });

  const stationName = resultValue.station_name.split(' ')[0];

  const getMapBounds = useCallback(() => {
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds();

    participants?.forEach(user => {
      const { start_y, start_x } = user;
      const position = new kakao.maps.LatLng(start_y, start_x);
      bounds.extend(position);
    });

    return bounds;
  }, [participants, map]);

  const handleMarkerClick = (marker: kakao.maps.Marker, index: number) => {
    if (!map) return;

    map.panTo(marker.getPosition());

    const strokeColor = getStrokeColor(index);
    new kakao.maps.Polyline({
      map: map,
      path: polylines[index].map(path => {
        return new kakao.maps.LatLng(path.lat, path.lng);
      }),
      strokeWeight: 7,
      strokeOpacity: 1,
      strokeColor,
    });
  };

  useEffect(() => {
    if (!map) return;

    const bounds = getMapBounds()!;

    map.setBounds(bounds);
  }, [map, resultValue, getMapBounds]);

  useEffect(() => {
    const loadKakaoMapScript = () => {
      const script = document.createElement('script');
      script.onload = () => window.kakao.maps.load(() => setLoaded(true));
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
      document.head.appendChild(script);
    };

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => setLoaded(true));
    } else {
      loadKakaoMapScript();
    }
  }, [resultValue, polylines]);

  return (
    <>
      {loaded && (
        <Map
          center={{ lat: resultValue.end_y, lng: resultValue.end_x }}
          level={3}
          isPanto
          onCreate={setMap}
        >
          {participants?.map((user, index) => {
            return (
              <MapMarker
                key={index}
                position={{
                  lat: user.start_y,
                  lng: user.start_x,
                }}
                image={{
                  src: `/images/marker${index}.svg`,
                  size: { width: 30, height: 39 },
                }}
                onClick={marker => handleMarkerClick(marker, index)}
              />
            );
          })}
          <CustomOverlayMap
            position={{ lat: resultValue.end_y, lng: resultValue.end_x }}
          >
            <CenterMarker>{stationName}</CenterMarker>
          </CustomOverlayMap>
          {polylines.map((polyline, index) => {
            return (
              <Polyline
                key={index}
                path={polyline}
                strokeWeight={6}
                strokeOpacity={1}
                strokeColor="#18C964"
              />
            );
          })}
        </Map>
      )}
    </>
  );
}

const Map = styled(KakaoMap)`
  width: 100%;
  height: 100vh;
`;
