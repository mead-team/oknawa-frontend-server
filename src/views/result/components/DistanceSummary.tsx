'use client';

import styled from 'styled-components';
import { useAtom } from 'jotai';
import { Card, CardBody } from '@nextui-org/react';
import { useEffect } from 'react';

import { convertToKoreanTime } from '@/utils/date';

import { resultState } from '@/jotai/result/store';
import Avatar, { AVATAR_COLORS } from '@/components/Avatar';
import { ShareIcon } from '@/assets/icons/Share';

declare let Kakao: any;

export default function DistanceSummary() {
  const [result] = useAtom(resultState);
  const { station_name, itinerary, share_key } = result;

  const handleKakaoSharingBtnClick = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `오늘은 ${station_name} 에서 만나요!`,
          description: '약속장소를 확인해보세요!',
          imageUrl:
            'http://k.kakaocdn.net/dn/bSbH9w/btqgegaEDfW/vD9KKV0hEintg6bZT4v4WK/kakaolink40_original.png',
          link: {
            webUrl: `${baseUrl}/result?sharekey=${share_key}`,
            mobileWebUrl: `${baseUrl}/result?sharekey=${share_key}`,
          },
        },
      });
    } catch (error) {
      console.error('Kakao share error:', error);
    }
  };

  const initializeKakaoSDK = () => {
    if (typeof window !== 'undefined' && !Kakao.isInitialized()) {
      try {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_APP_KEY);
      } catch (error) {
        console.error('Kakao init error:', error);
      }
    }
  };

  const stationName = station_name.split(' ')[0];

  const totalTravelTime = itinerary.reduce(
    (sum, user) => sum + user.itinerary.totalTime,
    0,
  );

  const averageTravelTime = totalTravelTime / itinerary.length;

  useEffect(() => {
    initializeKakaoSDK();
  }, []);

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
            {itinerary.map((user, index) => {
              const userName = user.name || `사용자${index + 1}`;
              const travelTime = convertToKoreanTime(user.itinerary.totalTime);
              const avatarColor = AVATAR_COLORS[index];

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
