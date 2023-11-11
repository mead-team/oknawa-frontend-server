import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Link from 'next/link';

interface Place {
  id: string;
  placeName: string;
  placeUrl: string;
  categoryGroupName: string;
  roadAddressName: string;
  phone: string;
  x?: string;
  y?: string;
}

interface PlaceItemProps {
  place: Place;
}

export default function PlaceItem({ place }: PlaceItemProps) {
  const { placeName, categoryGroupName, roadAddressName, phone, placeUrl } =
    place;
  return (
    <Link href={placeUrl}>
      <Card>
        <CardHeader className="flex gap-1">
          <h3>{placeName}</h3>
          <small className="text-default-500">{categoryGroupName}</small>
        </CardHeader>
        <CardBody>
          <p className="text-default-500">{roadAddressName}</p>
          <p className="text-default-500">{phone}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
