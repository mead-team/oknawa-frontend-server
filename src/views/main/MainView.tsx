import styled from 'styled-components';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

import SearchTypeSelector from '@/components/SearchTypeSelector';
import { PeopleIcon } from '@/assets/icons/People';
import { PlusIcon } from '@/assets/icons/Plus';
import { searchState } from '@/jotai/global/store';

export default function MainView() {
  const router = useRouter();

  const [, setSearchList] = useAtom(searchState);

  const storageRoomId =
    typeof window !== 'undefined' ? localStorage.getItem('roomId') : '';

  useEffect(() => {
    setSearchList([]);
  }, [setSearchList]);

  const handleCompletedRoomBtnClick = () => {
    router.push('/search/list-together');
  };

  return (
    <Container>
      <Title>{'출발지를 입력해주세요\n 중간 지점을 추천해드릴게요'}</Title>
      <SearchTypeSelectorBox>
        <SearchTypeSelector
          type="individual"
          icon={<PlusIcon width="42" height="42" />}
        />
        <SearchTypeSelector
          type="together"
          icon={<PeopleIcon width="42" height="42" />}
        />
      </SearchTypeSelectorBox>
      {Boolean(storageRoomId) && (
        <CompletedRoomButton onClick={handleCompletedRoomBtnClick}>
          <UserCheck />
          입력 중인 방 입장하기
        </CompletedRoomButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 65px;
  padding: 135px 19px 20px;
  min-height: 100vh;
`;

const Title = styled.h1`
  margin-bottom: 16px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-line;
  text-align: center;
  line-height: 43px;
`;

const SearchTypeSelectorBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const CompletedRoomButton = styled.div`
  display: flex;
  gap: 10px;
  align-self: center;
  background-color: #27272a;
  width: 50%;
  padding: 16px 22px;
  border-radius: 9px;
  white-space: pre-line;
  cursor: pointer;

  &:hover {
    background-color: #242d2d;
  }
`;
