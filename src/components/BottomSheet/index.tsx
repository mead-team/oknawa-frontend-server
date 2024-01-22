import { useAtom } from 'jotai';
import styled from 'styled-components';
import { useResetAtom } from 'jotai/utils';
import { useEffect } from 'react';

import { bottomSheetState } from '@/jotai/global/store';

import { CloseIcon } from '@/assets/icons/Close';

export default function BottomSheet() {
  const [bottomSheet] = useAtom(bottomSheetState);
  const reset = useResetAtom(bottomSheetState);

  const { isOpen, title, contents, containerHeight } = bottomSheet;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseBtnClick();
    }
  };

  const handleCloseBtnClick = () => {
    reset();
  };

  if (isOpen === false) return null;

  return (
    <Container onClick={handleOutsideClick}>
      <Wrapper containerHeight={containerHeight}>
        <TitleBox>
          <Title>{title}</Title>
          <CloseBtnBox onClick={handleCloseBtnClick}>
            <CloseIcon />
          </CloseBtnBox>
        </TitleBox>
        <Contents>{contents}</Contents>
      </Wrapper>
    </Container>
  );
}

const Container = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  animation: fadeIn_ani 0.3s both;

  @keyframes fadeIn_ani {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Wrapper = styled.div<{ containerHeight: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  border-radius: 0.8rem 0.8rem 0 0;
  background-color: #27272a;
  height: ${({ containerHeight }) => `${containerHeight}%`};
  animation: slide_up 0.4s both;

  @keyframes slide_up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2rem;
`;

const Title = styled.div`
  font-size: 19px;
  font-weight: 500;
`;

const CloseBtnBox = styled.div`
  cursor: pointer;
`;

const Contents = styled.div`
  overflow-y: auto;
`;
