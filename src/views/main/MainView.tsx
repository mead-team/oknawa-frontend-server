import styled from 'styled-components';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

import SearchTypeSelector from '@/components/SearchTypeSelector';
import { PeopleIcon } from '@/assets/icons/People';
import { PlusIcon } from '@/assets/icons/Plus';
import { searchState } from '@/jotai/global/store';

export default function MainView() {
  const [, setSearchList] = useAtom(searchState);

  useEffect(() => {
    setSearchList([]);
  }, [setSearchList]);

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
