import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

import { HotPlace } from '@/services/hot-place/types';

interface PlaceItemProps {
  place: HotPlace;
}

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
  const defaultImageUrl = '/icons/icon-256x256.png';

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
          <Image
            src={main_photo_url || defaultImageUrl}
            alt="핫플레이스 사진"
            width={80}
            height={64}
          />
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

const ImageBox = styled.div``;
