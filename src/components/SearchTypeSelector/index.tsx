import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface SearchTypeSelectorProps {
  type: 'individual' | 'together';
  icon: ReactNode;
}

export default function SearchTypeSelector({
  type,
  icon,
}: SearchTypeSelectorProps) {
  const router = useRouter();

  const titleText = type === 'individual' ? '직접' : '함께';
  const description =
    type === 'individual'
      ? '모든 구성원의\n출발지를 입력해요'
      : '각각 자신의 \n출발지를 입력해요';

  const handleButtonClick = () => {
    if (type === 'individual') {
      return router.push('/search/individual');
    }

    return router.push('/search/together');
  };

  return (
    <Container onClick={handleButtonClick}>
      <AvatarBox>{icon}</AvatarBox>
      <Title>{`${titleText} \n입력하기`}</Title>
      <Description>{description}</Description>
    </Container>
  );
}

const Container = styled.div`
  background-color: #27272a;
  padding: 16px 22px;
  border-radius: 9px;
  white-space: pre-line;
  cursor: pointer;

  &:hover {
    background-color: #242d2d;
  }
`;

const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
`;

const Description = styled.h3`
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  color: gray;
`;

const AvatarBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
