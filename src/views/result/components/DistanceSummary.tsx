'use client';

import styled from 'styled-components';
import { useAtom } from 'jotai';
import { Card, CardBody, Avatar, Divider } from '@nextui-org/react';

import { convertToKoreanTime } from '@/utils/date';

import { resultState } from '@/jotai/result/store';

type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'default';

const AVATAR_COLOR: Color[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
];

export default function DistanceSummary() {
  const [result] = useAtom(resultState);
  const { station_name, itinerary } = result;

  const totalTravelTime = itinerary.reduce(
    (sum, user) => sum + user.itinerary.totalTime,
    0,
  );
  const averageTravelTime = totalTravelTime / itinerary.length;

  return (
    <Container>
      <Card>
        <CardBody>
          <h1>{station_name}</h1>
          <h2>{`평균이동시간: ${convertToKoreanTime(averageTravelTime)}`}</h2>
          <Box>
            {itinerary.map((user, index) => {
              const userName = user.name || `사용자${index + 1}`;
              const travelTime = convertToKoreanTime(user.itinerary.totalTime);
              const avatarColor = AVATAR_COLOR[index] || 'default';

              return (
                <User className="text-small" key={index}>
                  <Avatar
                    name={String(index + 1)}
                    size="sm"
                    color={avatarColor}
                  />
                  <TravelTime>{travelTime}</TravelTime>
                  <Divider className="h-4" orientation="vertical" />
                  <UserName>{userName} 출발</UserName>
                </User>
              );
            })}
          </Box>
        </CardBody>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 4px;
  z-index: 10;
  width: 95%;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: calc(50% - 4px);
  margin-top: 8px;
`;

const TravelTime = styled.span`
  text-align: center;
  width: 30px;
`;

const UserName = styled.span`
  font-size: 13px;
`;
