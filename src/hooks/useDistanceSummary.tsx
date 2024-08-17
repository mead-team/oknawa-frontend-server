import { useAtom } from 'jotai';

import { resultState } from '@/jotai/result/store';

import { ErrorNotify } from '@/types/error';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function useDistanceSummary() {
  const [result] = useAtom(resultState);

  const { station_info, request_info } = result;

  const distanceSummaries = station_info.map(station => {
    const stationName = station.station_name.split(' ')[0];
    const itinerary = station.itinerary;
    const shareKey = station.share_key;
    const stationParticipants = station.request_info.participant;
    const totalTravelTime = station.itinerary.reduce(
      (sum, itinerary) => sum + itinerary.itinerary.totalTime,
      0,
    );
    const averageTravelTime = totalTravelTime / itinerary.length;

    return {
      station,
      stationName,
      itinerary,
      shareKey,
      stationParticipants,
      totalTravelTime,
      averageTravelTime,
    };
  });

  const initKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      try {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_APP_KEY);
      } catch (error: ErrorNotify) {
        console.error('Kakao init error:', error);
      }
    }
  };

  const kakaoShareSendDefault = (stationName: any, shareKey: any) => {
    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `오늘은 ${stationName}에서 만나요!`,
          description: '약속 장소를 확인해보세요!',
          imageUrl: process.env.NEXT_PUBLIC_KAKAO_SHARE_IMAGE,
          link: {
            webUrl: `${baseUrl}/result/confirm?sharekey=${shareKey}`,
            mobileWebUrl: `${baseUrl}/result/confirm?sharekey=${shareKey}`,
          },
        },
      });
    } catch (error) {
      console.error('Kakao share error:', error);
    }
  };

  return {
    distanceSummaries,
    initKakao,
    kakaoShareSendDefault,
    participants: request_info.participant,
  };
}
