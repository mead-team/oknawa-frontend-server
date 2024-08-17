import { MinusIcon } from '@/assets/icons/Minus';
import { PencilIcon } from '@/assets/icons/Pencil';
import { Crown } from 'lucide-react';
import Avatar from '@/components/Avatar';
import styled from 'styled-components';

interface PeopleCardProps {
  name: string;
  place: string;
  onDeleteIconClick?: () => void;
  onModifyIconClick?: () => void;
  index?: number;
  type?: 'individual' | 'together';
  isKing?: boolean;
}

export default function PeopleCard({
  name,
  place,
  onDeleteIconClick,
  onModifyIconClick,
  index,
  type = 'individual',
  isKing = false,
}: PeopleCardProps) {
  return (
    <Container>
      <Wrapper>
        <Avatar color="white" size="lg" />
        <div>
          <Name>
            {type === 'together' && index === 0 && <Crown color="#18C964" />}
            {name}
          </Name>
          <Place>{place}</Place>
        </div>
      </Wrapper>
      <IconsBox>
        {type === 'together' && isKing && (
          <Icon onClick={onModifyIconClick}>
            <PencilIcon width="20" height="20" />
          </Icon>
        )}
        {onDeleteIconClick && (
          <Icon onClick={onDeleteIconClick}>
            <MinusIcon width="20" height="20" />
          </Icon>
        )}
      </IconsBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #1c1c20;
  width: 100%;
  padding: 17px;
  border-radius: 10px;
  border: 1px solid #28282d;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Name = styled.p`
  display: flex;
  gap: 4px;
  font-weight: 600;
`;

const Place = styled.p`
  font-size: 14px;
  color: #6a6a72;
`;

const IconsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Icon = styled.div`
  cursor: pointer;
`;
