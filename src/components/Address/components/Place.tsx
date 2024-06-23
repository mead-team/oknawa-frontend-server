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
  display: flex;
  gap: 15px;
  align-items: center;
  padding-left: 8px;
  border-bottom: solid 1px #35353b;
  &:last-child {
    border-bottom: none;
  }
`;

const TitleContainer = styled.h2`
  padding-top: 10px;
  font-size: 15px;
  color: white;
`;

const SubTitleContainer = styled.h3`
  margin-bottom: 0.8rem;
  font-size: 12px;
  color: gray;
`;
