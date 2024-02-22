import { ReactNode } from 'react';
import styled from 'styled-components';

export default function Place({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: any;
}) {
  return <PlaceContainer onClick={onClick}>{children}</PlaceContainer>;
}

function Title({ children }: { children: ReactNode }) {
  return <TitleContainer>{children}</TitleContainer>;
}

function SubTitle({ children }: { children: ReactNode }) {
  return <SubTitleContainer>{children}</SubTitleContainer>;
}

Place.Title = Title;
Place.SubTitle = SubTitle;

const PlaceContainer = styled.li`
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  &:last-child {
    border-bottom: none;
  }
`;

const TitleContainer = styled.h2`
  font-size: 16px;
  color: #000;
`;

const SubTitleContainer = styled.h3`
  margin-bottom: 0.3rem;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;
