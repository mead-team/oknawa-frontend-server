import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  label: string;
  children?: ReactNode;
}

export default function Button({ label = '버튼', children }: ButtonProps) {
  return (
    <Container>
      <Text>{label}</Text>
      {children && children}
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 14px 0;
  border: 1px solid gray;
  border-radius: 9px;
`;

const Text = styled.h1`
  font-weight: 500;
`;
