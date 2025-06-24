'use client';

import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  CustomOverlayMap,
  Map as KakaoMap,
  MapMarker,
  Polyline,
} from 'react-kakao-maps-sdk';

import CenterMarker from './CenterMarker';

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

export default function ResultMap({
  stationName,
  itinerary,
  participants,
  end_x,
  end_y,
}: any) {
  const [loaded, setLoaded] = useState(false);
  const [map, setMap] = useState<kakao.maps.Map | undefined>(undefined);

  const getMapBounds = useCallback(() => {
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds();

    participants.forEach((user: any) => {
      const { start_y, start_x } = user;
      const position = new kakao.maps.LatLng(start_y, start_x);
      bounds.extend(position);
    });

    return bounds;
  }, [participants, map]);

  const polylines = itinerary?.map((user: any) => {
    return user.itinerary.total_polyline;
  });

  const handleMarkerClick = (marker: kakao.maps.Marker, index: number) => {
    if (!map) return;

    map.panTo(marker.getPosition());

    const strokeColor = getStrokeColor(index);
    new kakao.maps.Polyline({
      map: map,
      path: polylines[index].map((path: any) => {
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
  }, [map, getMapBounds]);

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
  }, [polylines]);

  return (
    <>
      {loaded && (
        <Map
          center={{ lat: end_y, lng: end_x }}
          level={3}
          isPanto
          onCreate={setMap}
        >
          {participants.map((user: any, index: number) => {
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
          <CustomOverlayMap position={{ lat: end_y, lng: end_x }}>
            <CenterMarker>{stationName}</CenterMarker>
          </CustomOverlayMap>
          {polylines.map((polyline: any, index: number) => {
            return (
              <Polyline
                key={index}
                path={polyline}
                strokeWeight={6}
                strokeOpacity={1}
                strokeColor={getStrokeColor(index)}
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
