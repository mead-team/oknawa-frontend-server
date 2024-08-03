import { modalState } from '@/jotai/global/store';

import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { useEffect } from 'react';

import {
  Container,
  Modal,
  ModalBody,
  ModalButtonWrapper,
  ModalContent,
  ModalHeader,
} from './style';

import Button from '../Button';
import ButtonPrimary from '../ButtonPrimary';

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
          <ModalButtonWrapper>
            {modal.buttonLabel02 ? (
              <>
                <Button
                  onClick={handleCloseBtnClick}
                  label={modal.buttonLabel}
                  widthFull
                />
                <ButtonPrimary
                  label={modal.buttonLabel02}
                  onClick={modal.onConfirm}
                  widthFull
                />
              </>
            ) : (
              <Button
                onClick={
                  modal.onConfirm ? modal.onConfirm : handleCloseBtnClick
                }
                label={modal.buttonLabel}
                widthFull
              />
            )}
          </ModalButtonWrapper>
        </ModalContent>
      </Modal>
    </Container>
  );
}
