import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';

import ModalBox from '../ModalBox';
import BottomSheet from '../BottomSheet';

import { flexCenter, media } from '@/styles/commonStyles';

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="dark text-foreground ">
      <Wrapper>
        {children}
        <BottomSheet />
      </Wrapper>
      <Toaster position="bottom-center" />
      <ModalBox />
    </Container>
  );
}

const Container = styled.div`
  ${flexCenter('row')}
  min-height: 100vh;
  overflow: auto;
  background-color: #0d0d0d;
`;

const Wrapper = styled.div`
  height: 100vh;
  /* min-width: 50%; */
  width: 100%;
  max-width: 500px;
  overflow: auto;
  background-color: black;

  ${media.mobile} {
    min-width: 100%; // 모바일 화면에서는 더 넓은 비율을 차지
  }
`;
