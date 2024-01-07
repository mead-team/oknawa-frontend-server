import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

export default function PWAIntallGuidance() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();

    setDeferredPrompt(event as BeforeInstallPromptEvent);
  };

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('사용자가 앱 설치를 동의했습니다.');
        } else {
          console.log('사용자가 앱 설치를 동의하지 않았습니다.');
        }

        setDeferredPrompt(null);
      });
    }
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  useEffect(() => {
    if (deferredPrompt) {
      onOpen();
    }
  }, [deferredPrompt, onOpen]);

  console.log('userAgent:: ', navigator.userAgent);
  console.log({ isMobile });

  if (!isMobile) return null;

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      size="sm"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>앱 설치 안내</ModalHeader>
            <ModalBody>
              <p>앱을 설치하고 편하게 이용해보세요!</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>취소</Button>
              <Button color="danger" onClick={handleInstall}>
                설치
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
