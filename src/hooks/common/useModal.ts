// hooks/useModal.js
import { useSetAtom } from 'jotai';
import { modalState } from '@/jotai/global/store';

interface IModalProps {
  buttonLabel: string;
  buttonLabel02?: string;
  contents: string;
}

export default function useModal() {
  const setModal = useSetAtom(modalState);

  const setModalContents = ({
    buttonLabel,
    buttonLabel02,
    contents,
  }: IModalProps) => {
    setModal(prevState => ({
      ...prevState,
      isOpen: true,
      buttonLabel,
      buttonLabel02,
      contents,
    }));
  };

  return { setModalContents };
}
