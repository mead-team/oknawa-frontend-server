import { Chip } from '@nextui-org/react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { useState } from 'react';

import PlaceItem from './PlaceItem';

import { useHotPlaceQuery } from '@/hooks/query/hot-place';

import { HotPlaceCategory } from '@/services/hot-place/types';

import { resultState } from '@/jotai/result/store';

import { RestaurantIcon } from '@/assets/icons/Restaurant';
import { CafeIcon } from '@/assets/icons/Cafe';
import { DrinkIcon } from '@/assets/icons/Drink';

const HOT_PLACE_CATEGORY: { title: string; category: HotPlaceCategory }[] = [
  { title: '맛집', category: 'food' },
  { title: '카페', category: 'cafe' },
  { title: '술집', category: 'drink' },
];

export default function HotPlaceModal() {
  const [result] = useAtom(resultState);
  const [category, setCategory] = useState<HotPlaceCategory>('food');

  const { data } = useHotPlaceQuery(category, {
    x: result.end_x,
    y: result.end_y,
  });

  const categoryIcons = {
    food: <RestaurantIcon />,
    cafe: <CafeIcon color="black" />,
    drink: <DrinkIcon color="black" />,
  };

  return (
    <Container>
      <Contents>
        <Category>
          {HOT_PLACE_CATEGORY.map(c => {
            const isSelected = c.category === category;
            return (
              <Chip
                key={c.category}
                color={isSelected ? 'success' : 'default'}
                onClick={() => setCategory(c.category)}
              >
                <ChipItem>
                  {categoryIcons[c.category]}
                  {c.title}
                </ChipItem>
              </Chip>
            );
          })}
        </Category>
        {data?.map(place => <PlaceItem key={place.id} place={place} />)}
      </Contents>
    </Container>
  );
}

const Container = styled.div``;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Category = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const ChipItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
