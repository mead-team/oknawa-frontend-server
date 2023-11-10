'use client';

import { flexCenter } from '@/styles/commonStyles';
import { Button } from '@nextui-org/react';
import styled from 'styled-components';

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
    </Container>
  );
}

const Container = styled.main`
  ${flexCenter('column')}
`;
