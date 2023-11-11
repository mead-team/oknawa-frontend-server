import { modalState } from '@/jotai/global/store';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useAtom } from 'jotai';

import { useResetAtom } from 'jotai/utils';

export default function ModalBox() {
  const [modal] = useAtom(modalState);
  const resetModal = useResetAtom(modalState);

  return (
    <Modal isOpen={modal.isOpen} onOpenChange={resetModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{modal.title}</ModalHeader>
        <ModalBody>{modal.contents}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
