// hooks/useModal.js
import { useSetAtom } from 'jotai';
import { modalState } from '@/jotai/global/store';

interface IModalProps {
  buttonLabel: string;
  contents: string;
}

export default function useModal() {
  const setModal = useSetAtom(modalState);

  const setModalContents = ({ buttonLabel, contents }: IModalProps) => {
    setModal(prevState => ({
      ...prevState,
      isOpen: true,
      buttonLabel,
      contents,
    }));
  };

  return { setModalContents };
}
