import { modalState } from '@/jotai/global/store';

import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { useEffect } from 'react';

import {
  Container,
  Modal,
  ModalBody,
  ModalButton,
  ModalContent,
  ModalHeader,
} from './style';

export default function ModalBox() {
  const [modal] = useAtom(modalState);
  const reset = useResetAtom(modalState);

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
    reset();
  };

  if (isOpen === false) return null;

  return (
    <Container onClick={handleOutsideClick}>
      <Modal>
        <ModalContent>
          {modal.title && <ModalHeader>{modal.title}</ModalHeader>}
          <ModalBody>{modal.contents}</ModalBody>
          {modal.buttonLabel && (
            <ModalButton onClick={handleCloseBtnClick}>
              {modal.buttonLabel}
            </ModalButton>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
}
