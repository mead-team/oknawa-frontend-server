import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import Image from 'next/image';

import { HotPlace } from '@/services/hot-place/types';
import { CafeIcon } from '@/assets/icons/Cafe';
import { RestaurantIcon } from '@/assets/icons/Restaurant';

interface PlaceItemProps {
  place: HotPlace;
}

type CategoryIcons = {
  [key: string]: JSX.Element;
};

export default function PlaceItem({ place }: PlaceItemProps) {
  const {
    place_name,
    category_group_name,
    road_address_name,
    place_url,
    main_photo_url,
    open_hour,
  } = place;

  const dayOfWeek =
    open_hour?.periodList?.[0]?.timeList?.[0]?.dayOfWeek ?? '영업시간 미기재';
  const timeSE = open_hour?.periodList?.[0]?.timeList?.[0]?.timeSE ?? '';

  console.log('category_group_name', category_group_name);

  const categoryIcons: CategoryIcons = {
    음식점: <RestaurantIcon color="gray" width="16" height="16" />,
    카페: <CafeIcon color="gray" width="16" height="16" />,
  };

  return (
    <Link href={place_url}>
      <StyledCard>
        <CardContent>
          <StyledCardHeader>
            <PlaceName>{place_name}</PlaceName>
            <Category>{category_group_name}</Category>
          </StyledCardHeader>
          <CardBody className="p-0">
            <CardBodyText>{road_address_name}</CardBodyText>
            <CardBodyText>
              {dayOfWeek} {timeSE}
            </CardBodyText>
          </CardBody>
        </CardContent>
        <ImageBox>
          {main_photo_url ? (
            <Image
              src={main_photo_url}
              alt="핫플레이스 사진"
              width={80}
              height={64}
              objectFit="cover"
              style={{
                borderRadius: '8px',
                minHeight: '70px',
              }}
            />
          ) : (
            <DefaultImage>{categoryIcons[category_group_name]}</DefaultImage>
          )}
        </ImageBox>
      </StyledCard>
    </Link>
  );
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  background-color: #313131;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledCardHeader = styled(CardHeader)`
  gap: 4px;
  padding: 0;
`;

const PlaceName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
  max-width: 170px;
`;

const Category = styled.small`
  font-size: 12px;
  color: #bdbdbd;
`;

const CardBodyText = styled.p`
  font-size: 12px;
  color: #bdbdbd;
`;

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  max-height: 75px;
  overflow: hidden;
  border-radius: 8px;
`;

const DefaultImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 64px;
  background-color: #9e9e9e;
  border-radius: 8px;
`;
