'use client';

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

    setIsMobile(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
      ) !== null,
    );
  }, []);

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [userChoice, setUserChoice] = useState('');

  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();

    setDeferredPrompt(event as BeforeInstallPromptEvent);
  };

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          setUserChoice('accepted');
          console.log('사용자가 앱 설치를 동의했습니다.');
        }
        if (choiceResult.outcome === 'dismissed') {
          setUserChoice('dismissed');
          console.log('사용자가 앱 설치를 거부했습니다.');
        }
      });
      setDeferredPrompt(null);
      onOpenChange();
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
    if (deferredPrompt && userChoice === '') {
      onOpen();
    }
  }, [deferredPrompt, userChoice, onOpen]);

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
