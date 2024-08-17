import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  $widthFull?: boolean;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export default function ButtonPrimary({
  label = '버튼',
  disabled,
  $widthFull,
  children,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <Container
      disabled={disabled}
      type={type}
      onClick={onClick}
      $widthFull={$widthFull}
    >
      <Text>{label}</Text>
      {children && children}
    </Container>
  );
}

const Container = styled.button<{
  disabled: boolean | undefined;
  $widthFull?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $widthFull }) => ($widthFull ? '100%' : 'fit-content')};
  gap: 8px;
  /* padding: 14px 0; */
  padding: 16px;
  height: 44px;

  border-radius: 8px;
  color: ${({ disabled }) => (disabled ? '#8D8D94' : '#101012')};
  background-color: #18c964;
  cursor: pointer;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'initial' : '#14b057')};
  }
`;

const Text = styled.h1`
  font-weight: 500;
`;
