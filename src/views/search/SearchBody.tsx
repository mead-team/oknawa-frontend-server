import { flexCenter } from '@/styles/commonStyles';
import { Button, Input } from '@nextui-org/react';
import { styled } from 'styled-components';

export default function SearchBody() {
  return (
    <Container>
      <Wrapper>
        <Section>
          <UserName size="sm" maxLength={4} radius="md" />
          <AddressButton size="lg">출발지를 입력해주세요.</AddressButton>
        </Section>
        <AddButton>+</AddButton>
      </Wrapper>
      <Button color="success">중간지점 찾기</Button>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: gray;
  padding: 35px 19px 20px;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.section`
  display: flex;
  gap: 50px;
`;

const UserName = styled(Input)`
  width: 25%;
`;

const AddressButton = styled(Button)`
  width: 70%;
`;

const AddButton = styled(Button)`
  margin-top: 20px;
`;
