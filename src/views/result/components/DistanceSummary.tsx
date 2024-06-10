'use client';

import styled from 'styled-components';
// import { Card, CardBody } from '@nextui-org/react';

import Avatar, { AVATAR_COLORS } from '@/components/Avatar';

import { convertToKoreanTime } from '@/utils/date';

import useDistanceSummary from '@/hooks/useDistanceSummary';

import { ItineraryItem } from '@/jotai/result/store';

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
            {/* <Card> */}
            {/* <CardBody> */}
            <Body>
              <Indicator>01/03</Indicator>
              <SharingButton onClick={() => handleKakaoSharingBtnClick(index)}>
                <ShareIcon />
                공유하기
              </SharingButton>
              <TitleWrapper>
                <StationName>
                  <Station.Container>
                    <Station.BoldText>{station.stationName}</Station.BoldText>
                  </Station.Container>
                </StationName>
                <AverageArrivalTime>
                  도착하는데 평균{' '}
                  <ArrivalTime>
                    {convertToKoreanTime(station.averageTravelTime)}
                  </ArrivalTime>{' '}
                  걸려요!
                </AverageArrivalTime>
              </TitleWrapper>
            </Body>
            {/* <Box>
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
            </Box> */}
            {/* </CardBody> */}
            {/* </Card> */}
          </Container>
        );
      })}
    </>
  );
}

const Container = styled.div`
  position: relative;
  background-color: #151518;
  padding: 20px 20px 16px;
  border-radius: 12px;
  width: 100%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Indicator = styled.div`
  color: #777781;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.003em;
`;
// const Card = styled.div``;
// const CardBody = styled.div``;

// const Box = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.1rem;
//   flex-wrap: wrap;
// `;

// const User = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   width: calc(50% - 4px);
//   margin-top: 8px;
// `;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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
  position: absolute;
  right: 20px;
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 13px;
  color: #d9d9d9;
`;

const AverageArrivalTime = styled.p`
  font-size: 18px;
`;

const ArrivalTime = styled.span`
  color: var(--primary);
  font-weight: 700;
`;

const UserArriveInfo = styled.p`
  font-size: 14px;
`;
