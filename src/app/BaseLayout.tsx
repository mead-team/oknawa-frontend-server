import { styled } from "styled-components";

const media = {
  mobile: "@media(max-width: 768px)",
};

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: auto;

  background-color: #f7f5ed;
`;

const Wrapper = styled.div`
  height: 100vh;
  min-width: 40%;
  background-color: white;
  overflow: auto;
  padding: 23px;

  ${media.mobile} {
    min-width: 80%; // 모바일 화면에서는 더 넓은 비율을 차지
  }
`;
