'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Button } from '@nextui-org/react';
import styled from 'styled-components';

import { flexCenter } from '@/styles/commonStyles';

export default function Home() {
  return (
    <Container>
      <h1>Ok, 나와!</h1>
      <div className="flex flex-wrap items-center gap-4">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
      </div>
      <Map
        center={{ lat: 37.566826, lng: 126.9786567 }}
        style={{ width: '100%', height: '350px', marginTop: '50px' }}
      >
        <MapMarker position={{ lat: 33.450701, lng: 126.570667 }} />
      </Map>
    </Container>
  );
}

const Container = styled.main`
  ${flexCenter('column')}
`;
