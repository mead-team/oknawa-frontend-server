import styled from 'styled-components';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  color: AvatarColor;
}

type AvatarColor = '#2E7FFF' | '#8B5CCC' | '#FF46CB' | '#FF5D02' | string;

export const AVATAR_COLORS: AvatarColor[] = [
  '#2E7FFF',
  '#8B5CCC',
  '#FF46CB',
  '#FF5D02',
  '#FFA500',
  '#B1DB08',
  '#F01616',
  '#2DAB00',
  '#7B420E',
  '#00FFFF',
];

const generateContainerSize = (size: string) => {
  switch (size) {
    case 'sm':
      return '36px';
    case 'md':
      return '38px';
    case 'lg':
      return '42px';
    default:
      return '36px';
  }
};

const generateFontSize = (size: string) => {
  switch (size) {
    case 'sm':
      return '8px';
    case 'md':
      return '16px';
    case 'lg':
      return '24px';
    default:
      return '16px';
  }
};

export default function Avatar({ name, size = 'sm', color }: AvatarProps) {
  const userName = name.length > 4 ? `${name.slice(0, 4)}` : name;

  return (
    <Container size={size} color={color}>
      <Name size={size}>{userName}</Name>
    </Container>
  );
}

const Container = styled.div<{ size: string; color: AvatarColor }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => generateContainerSize(size)};
  height: ${({ size }) => generateContainerSize(size)};
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const Name = styled.span<{ size: string }>`
  font-size: ${({ size }) => generateFontSize(size)};
  font-weight: 700;
  color: #ffffff;
`;
