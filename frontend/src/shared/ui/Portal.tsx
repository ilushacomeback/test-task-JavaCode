import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface PortalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  to?: HTMLElement;
}

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: rgb(255, 255, 255);
  padding: 10px;
  min-width: 300px;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Main = styled.div`
  padding: 10px;
  border-radius: 10px;
`;

export const Portal = ({
  children,
  to = document.body,
  isOpen,
  onClose,
}: PortalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {createPortal(
        <Container>
          <Modal>
            <Header>
              <button onClick={onClose}>Закрыть</button>
            </Header>
            <Main>{children}</Main>
          </Modal>
        </Container>,
        to
      )}
    </>
  );
};
