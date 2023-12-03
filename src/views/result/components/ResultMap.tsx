import { resultState } from '@/jotai/result/store';
import { useAtom } from 'jotai';
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

export default function ResultMap() {
  const [result] = useAtom(resultState);

  return (
    <StyledMap center={{ lat: result.end_y, lng: result.end_x }} level={3}>
      <MapMarker position={{ lat: result.end_y, lng: result.end_x }} />
    </StyledMap>
  );
}

const StyledMap = styled(KakaoMap)`
  width: 100%;
  height: 100vh;
`;
