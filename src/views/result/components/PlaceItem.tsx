import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Link from 'next/link';
import styled from 'styled-components';

import { HotPlace } from '@/services/hot-place/types';
import Image from 'next/image';

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

  const { dayOfWeek, timeSE } = open_hour.periodList[0].timeList[0];

  return (
    <Link href={place_url}>
      <StyledCard>
        <CardContent>
          <CardHeader className="flex gap-2 p-0">
            <PlaceName>{place_name}</PlaceName>
            <Category>{category_group_name}</Category>
          </CardHeader>
          <CardBody className="p-0">
            <CardBodyText>{road_address_name}</CardBodyText>
            <CardBodyText>
              {dayOfWeek} {timeSE}
            </CardBodyText>
          </CardBody>
        </CardContent>
        <ImageBox>
          <Image
            src={main_photo_url}
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

const PlaceName = styled.h3`
  font-size: 16px;
  font-weight: 700;
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
