import { useState } from 'react';
import { Button, Portal } from '@/shared';
import styled from 'styled-components';

interface FormProps {
  onClose: () => void;
  removeTask: () => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Form = ({ onClose, removeTask }: FormProps) => {
  return (
    <Container>
      <h1>Вы уверены?</h1>
      <Buttons>
        <Button handleOnClick={removeTask}>Удалить</Button>
        <Button handleOnClick={onClose}>Отменить</Button>
      </Buttons>
    </Container>
  );
};

export const RemoveTask = ({ removeTask }: Omit<FormProps, 'onClose'>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button handleOnClick={() => setIsOpen(true)}>Удалить</Button>
      <Portal isOpen={isOpen} onClose={handleOnClose}>
        <Form onClose={handleOnClose} removeTask={removeTask} />
      </Portal>
    </div>
  );
};
