import { styled } from 'styled-components';

import { modalState } from '@/jotai/global/store';
// import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { useEffect } from 'react';

export default function ModalBox() {
  const [modal] = useAtom(modalState);
  const resetModal = useResetAtom(modalState);

  const { isOpen } = modal;

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
    resetModal();
  };

  if (isOpen === false) return null;

  return (
    <Container onClick={handleOutsideClick}>
      <Modal>
        <ModalContent>
          {modal.isTitle && <ModalHeader>{modal.title}</ModalHeader>}
          <ModalBody>{modal.contents}</ModalBody>
          {modal.isButton && (
            <ModalButton onClick={handleCloseBtnClick}>
              {modal.buttonLabel}
            </ModalButton>
          )}
        </ModalContent>
      </Modal>
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
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99999;
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

const Modal = styled.div`
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: #27272a;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 08);
  border-radius: 8px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 500;
`;
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  text-align: center;
  line-height: 150%;
  font-size: 20px;
`;

const ModalButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 56px;
  justify-content: center;
  align-items: center;
  background-color: #18c964;
  color: #000000;
  font-weight: 500;
  border-radius: 16px;
  cursor: pointer;
`;
