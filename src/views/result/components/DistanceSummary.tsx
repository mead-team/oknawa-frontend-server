'use client';

import styled from 'styled-components';
import { Card, CardBody } from '@nextui-org/react';

import Avatar, { AVATAR_COLORS } from '@/components/Avatar';

import { convertToKoreanTime } from '@/utils/date';

import useDistanceSummary from '@/hooks/useDistanceSummary';

import { ItineraryItem } from '@/jotai/result/store';

import { ArrowRight } from '@/assets/icons/ArrowRight';
import { ShareIcon } from '@/assets/icons/Share';

export default function DistanceSummary() {
  const { distanceSummaries, initKakao, kakaoShareSendDefault } =
    useDistanceSummary();

  const handleKakaoSharingBtnClick = (index: number) => {
    initKakao();
    kakaoShareSendDefault(index);
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
    <>
      {distanceSummaries?.map((station, index) => {
        return (
          <Container key={index}>
            <Card>
              <CardBody>
                <StationName>
                  <Station.Container>
                    <Station.BoldText>{station.stationName}</Station.BoldText>을
                    추천해요!
                  </Station.Container>
                  <SharingButton
                    onClick={() => handleKakaoSharingBtnClick(index)}
                  >
                    <ShareIcon />
                    공유하기
                  </SharingButton>
                </StationName>
                <AverageArrivalTime>
                  도착하는데 평균{' '}
                  <ArrivalTime>
                    {convertToKoreanTime(station.averageTravelTime)}
                  </ArrivalTime>{' '}
                </AverageArrivalTime>
                <Box>
                  {station.itinerary?.map((user, index) => {
                    const { userName, travelTime, avatarColor } =
                      genUserArriveInfo(user, index);

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
                {/* <Indicator>
                  <IndicatorLabel>다른 장소 더보기</IndicatorLabel>
                  <ArrowRight />
                </Indicator> */}
              </CardBody>
            </Card>
          </Container>
        );
      })}
    </>
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

// const Indicator = styled.div`
//   display: flex;
//   padding: 24px 0 8px;
//   justify-content: center;
//   align-items: center;
//   gap: 8px;
//   cursor: pointer;

//   &:hover {
//     font-weight: 500;
//   }
// `;

// const IndicatorLabel = styled.div`
//   font-size: 14px;
// `;

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
