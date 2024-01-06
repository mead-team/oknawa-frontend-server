'use client';

import { useCallback, useEffect, useState } from 'react';
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
  const [result] = useAtom(resultState);
  const searchValue = useAtomValue(searchState);
  const [loaded, setLoaded] = useState(false);

  const [map, setMap] = useState<kakao.maps.Map | undefined>(undefined);

  const polylines = result.itinerary.map(user => {
    return user.itinerary.total_polyline;
  });

  const stationName = result.station_name.split(' ')[0];

  const getMapBounds = useCallback(() => {
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds();
    searchValue?.forEach(user => {
      const { latitude, longitude } = user.address;
      const position = new kakao.maps.LatLng(latitude, longitude);
      bounds.extend(position);
    });

    return bounds;
  }, [searchValue, map]);

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
  }, [map, searchValue, getMapBounds]);

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
  }, [result, polylines]);

  return (
    <>
      {loaded && (
        <Map
          center={{ lat: result.end_y, lng: result.end_x }}
          level={3}
          isPanto
          onCreate={setMap}
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
                onClick={marker => handleMarkerClick(marker, index)}
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

const MapCenter = styled(KakaoMap)`
  width: 100%;
  height: 100vh;
`;
