import { resultState } from '@/jotai/result/store';
import { useAtom } from 'jotai';
import { Map as KakaoMap, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const getStrokeColor = (index: number) => {
  switch (index) {
    case 0:
      return '#0070f0';
    case 1:
      return '#9455d3';
    case 2:
      return '#18c964';
    case 3:
      return '#f5a524';
    default:
      return '#0070f0';
  }
};

export default function ResultMap() {
  const [result] = useAtom(resultState);
  const polylines = result.itinerary.map(user => {
    return user.itinerary.total_polyline;
  });

  console.log(polylines);
  return (
    <StyledMap center={{ lat: result.end_y, lng: result.end_x }} level={3}>
      <MapMarker position={{ lat: result.end_y, lng: result.end_x }} />
      {polylines.map((polyline, index) => {
        return (
          <Polyline
            key={index}
            path={polyline}
            strokeWeight={7}
            strokeOpacity={0.7}
            strokeColor={getStrokeColor(index)}
          />
        );
      })}
    </StyledMap>
  );
}

const StyledMap = styled(KakaoMap)`
  width: 100%;
  height: 100vh;
`;
