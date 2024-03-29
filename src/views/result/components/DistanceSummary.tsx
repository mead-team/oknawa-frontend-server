'use client';

import styled from 'styled-components';
import { Card, CardBody } from '@nextui-org/react';

import Avatar, { AVATAR_COLORS } from '@/components/Avatar';

import { convertToKoreanTime } from '@/utils/date';

import useDistanceSummary from '@/hooks/useDistanceSummary';

import { ItineraryItem } from '@/jotai/result/store';

import { ShareIcon } from '@/assets/icons/Share';

export default function DistanceSummary() {
  const {
    stationName,
    averageTravelTime,
    itinerary,
    initKakao,
    kakaoShareSendDefault,
  } = useDistanceSummary();

  const handleKakaoSharingBtnClick = () => {
    initKakao();
    kakaoShareSendDefault();
  };

  const genUserArriveInfo = (user: ItineraryItem, index: number) => {
    const userName = user.name || `사용자${index + 1}`;
    const travelTime = convertToKoreanTime(user.itinerary.totalTime);
    const avatarColor = AVATAR_COLORS[index];

    return {
      userName,
      travelTime,
      avatarColor,
    };
  };

  return (
    <Container>
      <Card>
        <CardBody>
          <StationName>
            <Station.Container>
              <Station.BoldText>{stationName}</Station.BoldText>을 추천해요!
            </Station.Container>
            <SharingButton onClick={handleKakaoSharingBtnClick}>
              <ShareIcon />
              공유하기
            </SharingButton>
          </StationName>
          <AverageArrivalTime>
            도착하는데 평균{' '}
            <ArrivalTime>{convertToKoreanTime(averageTravelTime)}</ArrivalTime>{' '}
            걸려요
          </AverageArrivalTime>
          <Box>
            {itinerary?.map((user, index) => {
              const { userName, travelTime, avatarColor } = genUserArriveInfo(
                user,
                index,
              );

              return (
                <User className="text-small" key={index}>
                  <Avatar name={userName} color={avatarColor} />
                  <UserArriveInfo>
                    {user.region_name} {travelTime}
                  </UserArriveInfo>
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
  top: 65px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  z-index: 10;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
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
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;

const Station = {
  Container: styled.span`
    margin-right: 1px;
    font-weight: 500;
  `,
  BoldText: styled.span`
    font-weight: 700;
  `,
};

const SharingButton = styled.button`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  font-size: 11px;
  color: #bdbdbd;
`;

const AverageArrivalTime = styled.p`
  font-size: 18px;
`;

const ArrivalTime = styled.span`
  font-weight: 700;
`;

const UserArriveInfo = styled.p`
  font-size: 14px;
`;
