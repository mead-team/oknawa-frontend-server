import { useEffect } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useResetAtom } from 'jotai/utils';

import {
  동이름에_건물명_추가,
  위도_경도_생성,
  전체주소_생성,
} from '@/utils/common';

import { modalState } from '@/jotai/global/store';

declare let kakao: any;

export default function DaumPostCode({
  setValue,
  currentIndex,
}: {
  setValue: any;
  currentIndex: number;
}) {
  const resetModal = useResetAtom(modalState);

  const handleComplete = async (data: any) => {
    const 동이름 = data.bname || '';
    const 동이름_건물명 = 동이름에_건물명_추가(data.buildingName, 동이름);
    const 전체주소 = 전체주소_생성(data.address, `${동이름_건물명}`);
    const 위도_경도 = await 위도_경도_생성(전체주소);

    setValue(`userSection.${currentIndex}.address`, {
      fullAddress: 전체주소,
      latitude: 위도_경도.latitude,
      longitude: 위도_경도.longitude,
    });

    resetModal();
  };

  useEffect(() => {
    if (kakao) {
      kakao.maps.load(() => {
        console.log('Loaded');
      });
    }
  }, []);

  return <DaumPostcodeEmbed onComplete={handleComplete} />;
}
