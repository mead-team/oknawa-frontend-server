// hooks/useModal.js
import { useSetAtom } from 'jotai';
import { modalState } from '@/jotai/global/store';

interface IModalProps {
  buttonLabel: string;
  buttonLabel02?: string;
  contents: string;
  onConfirm?: () => void;
}

export default function useModal() {
  const setModal = useSetAtom(modalState);

  const setModalContents = ({
    buttonLabel,
    buttonLabel02,
    onConfirm,
    contents,
  }: IModalProps) => {
    setModal(prevState => ({
      ...prevState,
      isOpen: true,
      buttonLabel,
      buttonLabel02,
      contents,
      onConfirm,
    }));
  };

  return { setModalContents };
}
