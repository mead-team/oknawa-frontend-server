'use client';

import styled from 'styled-components';
import { useAtom } from 'jotai';
import { Card, CardBody } from '@nextui-org/react';

import { convertToKoreanTime } from '@/utils/date';

import { resultState } from '@/jotai/result/store';
import Avatar, { AVATAR_COLORS } from '@/components/Avatar';

export default function DistanceSummary() {
  const [result] = useAtom(resultState);
  const { station_name, itinerary } = result;

  const stationName = station_name.split(' ')[0];

  const totalTravelTime = itinerary.reduce(
    (sum, user) => sum + user.itinerary.totalTime,
    0,
  );
  const averageTravelTime = totalTravelTime / itinerary.length;

  return (
    <Container>
      <Card>
        <CardBody>
          <StationName>
            <Station>{stationName}</Station>을 추천해요!
          </StationName>
          <AverageArrivalTime>
            도착하는데 평균{' '}
            <ArrivalTime>{convertToKoreanTime(averageTravelTime)}</ArrivalTime>{' '}
            걸려요
          </AverageArrivalTime>
          <Box>
            {itinerary.map((user, index) => {
              const userName = user.name || `사용자${index + 1}`;
              const travelTime = convertToKoreanTime(user.itinerary.totalTime);
              const avatarColor = AVATAR_COLORS[index];

              return (
                <User className="text-small" key={index}>
                  <Avatar name={userName} color={avatarColor} />
                  <UserArriveInfo>강북구에서 {travelTime}</UserArriveInfo>
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

const StationName = styled.p`
  font-size: 20px;
`;

const Station = styled.span`
  margin-right: 1px;
  font-weight: bold;
`;

const AverageArrivalTime = styled.p`
  font-size: 18px;
`;

const ArrivalTime = styled.span`
  font-weight: bold;
`;

const UserArriveInfo = styled.p`
  font-size: 14px;
`;
