import { HotPlace } from '@/services/hot-place/types';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Link from 'next/link';

interface PlaceItemProps {
  place: HotPlace;
}

export default function PlaceItem({ place }: PlaceItemProps) {
  const {
    place_name,
    category_group_name,
    road_address_name,
    phone,
    place_url,
  } = place;
  return (
    <Link href={place_url}>
      <Card>
        <CardHeader className="flex gap-1">
          <h3>{place_name}</h3>
          <small className="text-default-500">{category_group_name}</small>
        </CardHeader>
        <CardBody>
          <p className="text-default-500">{road_address_name}</p>
          <p className="text-default-500">{phone}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
