import styled from 'styled-components';
import Avatar from '../Avatar';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface SearchTypeSelectorProps {
  type: 'individual' | 'together';
}

export default function SearchTypeSelector({ type }: SearchTypeSelectorProps) {
  const router = useRouter();

  const titleText = type === 'individual' ? '직접' : '함께';
  const description =
    type === 'individual'
      ? '모든 구성원의\n출발지를 입력해요'
      : '각각 자신의 \n출발지를 입력해요';

  const handleButtonClick = () => {
    if (type === 'individual') {
      router.push('/search/individual');
    } else {
      toast('서비스 준비중입니다.', {
        duration: 900,
        icon: '❗️',
        style: {
          borderRadius: '12px',
          background: '#300B0B',
          color: '#fff',
          border: '1px solid #FF4D4D',
        },
      });
    }
  };

  return (
    <Container onClick={handleButtonClick}>
      <AvatarBox>
        <Avatar color="#18C964" size="lg" />
      </AvatarBox>
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
