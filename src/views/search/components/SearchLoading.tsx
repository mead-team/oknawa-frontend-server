import styled from 'styled-components';

export default function SearchLoading() {
  return (
    <Container>
      <Wrapper>
        <Image src="/loading.gif" width={148} height={148} alt="loading" />
        <Text>
          가장 만나기 편한 <br /> 장소를 찾고 있어요
        </Text>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 60px;
  border-radius: 20px;
  background-color: #18c964;
`;

const Image = styled.img`
  margin-bottom: 24px;
  border-radius: 24px;
`;

const Text = styled.p`
  width: 135px;
  color: #000;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;
