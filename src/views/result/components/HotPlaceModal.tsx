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
import { useHotPlaceQuery } from '@/hooks/query/hot-place';
import { useAtom } from 'jotai';
import { resultState } from '@/jotai/result/store';

interface HotPlaceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HotPlaceModal({
  isOpen,
  onOpenChange,
}: HotPlaceModalProps) {
  const [result] = useAtom(resultState);

  const { data, isLoading } = useHotPlaceQuery('food', {
    x: result.end_x,
    y: result.end_y,
  });

  if (isLoading) {
    return <div>로딩...</div>;
  }

  return (
    <StyledModal
      isOpen={isOpen}
      scrollBehavior="inside"
      placement="bottom"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>🔥 핫플레이스 in {result.station_name}</ModalHeader>
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
              {data?.map(place => <PlaceItem key={place.id} place={place} />)}
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
