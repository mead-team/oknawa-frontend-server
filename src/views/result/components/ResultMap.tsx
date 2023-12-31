import { searchState } from '@/jotai/global/store';
import { resultState } from '@/jotai/result/store';
import { useAtom, useAtomValue } from 'jotai';
import { Map as KakaoMap, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

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

  const polylines = result.itinerary.map(user => {
    return user.itinerary.total_polyline;
  });

  return (
    <MapCenter center={{ lat: result.end_y, lng: result.end_x }} level={3}>
      {searchValue?.map((user, index) => {
        return (
          <MapMarker
            key={index}
            position={{
              lat: user.address.latitude,
              lng: user.address.longitude,
            }}
          />
        );
      })}
      <MapMarker position={{ lat: result.end_y, lng: result.end_x }} />
      {polylines.map((polyline, index) => {
        return (
          <Polyline
            key={index}
            path={polyline}
            strokeWeight={4}
            strokeOpacity={1}
            strokeColor="#18C964"
          />
        );
      })}
    </MapCenter>
  );
}

const MapCenter = styled(KakaoMap)`
  width: 100%;
  height: 100vh;
`;
