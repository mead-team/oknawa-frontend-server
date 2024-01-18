import { useAtom } from 'jotai';

import { resultState } from '@/jotai/result/store';
import { baseURL } from '@/axois';

import { ErrorNotify } from '@/types/error';

export default function useDistanceSummary() {
  const [result] = useAtom(resultState);
  const { station_name, itinerary, share_key } = result;

  const initKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      try {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_APP_KEY);
      } catch (error: ErrorNotify) {
        console.error('Kakao init error:', error);
      }
    }
  };

  const kakaoShareSendDefault = () => {
    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `오늘은 ${station_name} 에서 만나요!`,
          description: '약속장소를 확인해보세요!',
          imageUrl: process.env.NEXT_PUBLIC_KAKAO_SHARE_IMAGE,
          link: {
            webUrl: `${baseURL}/result?sharekey=${share_key}`,
            mobileWebUrl: `${baseURL}/result?sharekey=${share_key}`,
          },
        },
      });
    } catch (error) {
      console.error('Kakao share error:', error);
    }
  };

  const stationName = station_name.split(' ')[0];

  const totalTravelTime = itinerary.reduce(
    (sum, user) => sum + user.itinerary.totalTime,
    0,
  );

  const averageTravelTime = totalTravelTime / itinerary.length;

  return {
    stationName,
    averageTravelTime,
    itinerary,
    initKakao,
    kakaoShareSendDefault,
  };
}
