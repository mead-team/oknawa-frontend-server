'use client';

import { Button, useDisclosure } from '@nextui-org/react';
import styled from 'styled-components';

import DistanceSummary from './components/DistanceSummary';
import HotPlaceModal from './components/HotPlaceModal';
import ResultMap from './components/ResultMap';

export default function ResultBody() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleFloatingButtonClick = () => {
    onOpen();
  };

  return (
    <Container>
      <DistanceSummary />
      <ResultMap />
      <FloatingButton
        radius="full"
        size="lg"
        color="success"
        variant="shadow"
        onClick={handleFloatingButtonClick}
      >
        핫플레이스 보기
      </FloatingButton>
      <HotPlaceModal isOpen={isOpen} onOpenChange={onOpenChange} />
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
