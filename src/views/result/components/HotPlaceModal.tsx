import {
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import styled from 'styled-components';

import CheckIcon from './CheckIcon';
import PlaceItem from './PlaceItem';

const PLACE_DATA = [
  {
    id: '1',
    placeName: '마포갈매기',
    placeUrl: 'http://place.map.kakao.com/7961755',
    categoryGroupName: '닭,오리요리',
    roadAddressName: '서울 마포구 동교로46길 34',
    phone: '02-333-4567',
    x: '126.925173685509',
    y: '37.5566027683778',
  },
  {
    id: '2',
    placeName: '강남삼겹살',
    placeUrl: 'http://place.map.kakao.com/26480737',
    categoryGroupName: '돼지고기,삼겹살',
    roadAddressName: '서울 마포구 동교로46길 34',
    phone: '02-333-4567',
    x: '126.925173685509',
    y: '37.5566027683778',
  },
  {
    id: '3',
    placeName: '파이브스팟 판교점',
    placeUrl: 'http://place.map.kakao.com/26480737',
    categoryGroupName: '공유오피스',
    roadAddressName: '서울 마포구 동교로46길 34',
    phone: '02-333-4567',
    x: '126.925173685509',
    y: '37.5566027683778',
  },
  {
    id: '4',
    placeName: '유성손칼국수',
    placeUrl: 'http://place.map.kakao.com/26480737',
    categoryGroupName: '면, 국수',
    roadAddressName: '서울 마포구 동교로46길 34',
    phone: '02-333-4567',
    x: '126.925173685509',
    y: '37.5566027683778',
  },
  {
    id: '5',
    placeName: '일미',
    placeUrl: 'http://place.map.kakao.com/26480737',
    categoryGroupName: '돼지고기, 제육볶음',
    roadAddressName: '서울 마포구 동교로46길 34',
    phone: '02-333-4567',
    x: '126.925173685509',
    y: '37.5566027683778',
  },
];

interface HotPlaceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HotPlaceModal({
  isOpen,
  onOpenChange,
}: HotPlaceModalProps) {
  return (
    <StyledModal
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>🔥 핫플레이스 in 서울역</ModalHeader>
            <ModalBody>
              <Category>
                <Chip
                  variant="faded"
                  color="success"
                  startContent={<CheckIcon size={18} />}
                >
                  맛집
                </Chip>
                <Chip variant="flat">카페</Chip>
                <Chip variant="flat">술집</Chip>
              </Category>
              {PLACE_DATA.map(place => (
                <PlaceItem key={place.id} place={place} />
              ))}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </StyledModal>
  );
}

const StyledModal = styled(Modal)`
  max-height: 500px;
`;

const Category = styled.div`
  display: flex;
  gap: 8px;
`;
