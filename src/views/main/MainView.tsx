import SearchTypeSelector from '@/components/SearchTypeSelector';
import styled from 'styled-components';

export default function MainView() {
  return (
    <Container>
      <Title>{'출발지를 입력해주세요\n 중간 지점을 추천해드릴게요'}</Title>
      <SearchTypeSelectorBox>
        <SearchTypeSelector type="individual" />
        <SearchTypeSelector type="together" />
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
