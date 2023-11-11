'use client';

import styled from 'styled-components';

import DistanceSummary from './components/DistanceSummary';
import ResultMap from './components/ResultMap';

export default function ResultBody() {
  return (
    <Container>
      <DistanceSummary />
      <ResultMap />
    </Container>
  );
}

const Container = styled.main`
  position: relative;
  width: 100%;
`;
