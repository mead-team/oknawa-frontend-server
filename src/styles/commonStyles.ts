import { css } from 'styled-components';

type DirectionType = 'row' | 'column';

export const flexCenter = (direction: DirectionType = 'row') => css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${direction};
`;
