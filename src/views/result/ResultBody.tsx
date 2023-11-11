'use client';

import { Button } from '@nextui-org/react';
import styled from 'styled-components';

import DistanceSummary from './components/DistanceSummary';
import ResultMap from './components/ResultMap';

export default function ResultBody() {
  return (
    <Container>
      <DistanceSummary />
      <ResultMap />
      <FloatingButton radius="full" size="lg" color="success">
        핫플레이스 보기
      </FloatingButton>
    </Container>
  );
}

const Container = styled.main`
  position: relative;
  width: 100%;
`;

const FloatingButton = styled(Button)`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;
