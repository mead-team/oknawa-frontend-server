'use client';

import styled from 'styled-components';

import DistanceSummary from './components/DistanceSummary';
import ResultMap from './components/ResultMap';

export default function ResultBody() {
  return (
    <>
      <Container>
        <DistanceSummary />
      </Container>
      <ResultMap />
    </>
  );
}

const Container = styled.main`
  padding: 10px;
  z-index: 1;
`;
