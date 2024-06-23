import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export default function Button({
  label = '버튼',
  disabled,
  children,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <Container disabled={disabled} type={type} onClick={onClick}>
      <Text>{label}</Text>
      {children && children}
    </Container>
  );
}

const Container = styled.button<{ disabled: boolean | undefined }>`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 14px 0;
  border: ${({ disabled }) =>
    disabled ? '1px solid #8D8D94' : '1px solid white'};
  border-radius: 9px;
  color: ${({ disabled }) => (disabled ? '#8D8D94' : 'white')};
`;

const Text = styled.h1`
  font-weight: 500;
`;
