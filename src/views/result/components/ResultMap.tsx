import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

export default function ResultMap() {
  return (
    <StyledMap center={{ lat: 37.566826, lng: 126.9786567 }} level={3}>
      <MapMarker position={{ lat: 37.566826, lng: 126.9786567 }} />
    </StyledMap>
  );
}

const StyledMap = styled(KakaoMap)`
  width: 100%;
  height: 100vh;
`;
