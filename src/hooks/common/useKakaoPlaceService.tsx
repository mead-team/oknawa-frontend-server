import { useEffect, useState } from 'react';

import {
  KakaoPlace,
  KakaoPlacesSearchStatus,
} from '@/components/Address/types';

export default function useKakaoPlaceService() {
  const [places, setPlaces] = useState<KakaoPlace[]>([]);
  const [kakaoPlaceService, setKakaoPlaceService] =
    useState<kakao.maps.services.Places | null>(null);

  const searchPlaceCB = (
    data: KakaoPlace[],
    status: KakaoPlacesSearchStatus,
  ) => {
    switch (status) {
      case kakao.maps.services.Status.OK:
        setPlaces(data);
        break;
      case kakao.maps.services.Status.ZERO_RESULT:
        setPlaces([]);
        break;
      default:
        alert('검색 결과 중 오류가 발생했습니다.');
        break;
    }
  };

  useEffect(() => {
    kakao.maps.load(() => {
      const ps = new kakao.maps.services.Places();
      setKakaoPlaceService(ps);
    });
  }, []);

  return { places, kakaoPlaceService, searchPlaceCB };
}
