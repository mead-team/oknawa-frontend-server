import { styled } from 'styled-components';

export const Container = styled.section`
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

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: #27272a;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 08);
  border-radius: 8px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 500;
`;
export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  text-align: center;
  line-height: 150%;
  font-size: 20px;
  white-space: pre-line;
`;

export const ModalButton = styled.div`
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
