import styled from 'styled-components';

const media = {
  mobile: '@media(max-width: 768px)',
};

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="dark text-foreground bg-background">
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
`;

const Wrapper = styled.div`
  height: 100vh;
  min-width: 50%;
  overflow: auto;

  ${media.mobile} {
    min-width: 100%; // 모바일 화면에서는 더 넓은 비율을 차지
  }
`;
