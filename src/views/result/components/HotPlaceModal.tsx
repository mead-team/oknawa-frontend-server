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
import { useState } from 'react';
import { HotPlaceCategory } from '@/services/hot-place/types';

interface HotPlaceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HOT_PLACE_CATEGORY: HotPlaceCategory[] = ['food', 'cafe', 'drink'];

export default function HotPlaceModal({
  isOpen,
  onOpenChange,
}: HotPlaceModalProps) {
  const [category, setCategory] = useState<HotPlaceCategory>('food');

  const [result] = useAtom(resultState);

  const { data } = useHotPlaceQuery(category, {
    x: result.end_x,
    y: result.end_y,
  });

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
                {HOT_PLACE_CATEGORY.map(c => {
                  const isSelected = c === category;
                  return (
                    <Chip
                      key={c}
                      variant={isSelected ? 'faded' : 'flat'}
                      color={isSelected ? 'success' : 'default'}
                      startContent={isSelected && <CheckIcon />}
                      onClick={() => setCategory(c)}
                    >
                      {c}
                    </Chip>
                  );
                })}
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
