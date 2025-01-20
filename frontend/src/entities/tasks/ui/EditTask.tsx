import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Input, Label, Portal } from '@/shared';
import styled from 'styled-components';

interface FormProps {
  onClose: () => void;
  editTask: (name: string) => void;
  handleOnChange: Dispatch<SetStateAction<string>>;
  value: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Form = ({ onClose, editTask, handleOnChange, value }: FormProps) => {
  const handleEditTask = () => {
    editTask(value);
    handleOnChange('')
    onClose();
  };
  return (
    <Container>
      <div>
        <Label htmlFor="name">Новое название</Label>
        <Input
          style={{ marginTop: '5px' }}
          handleOnChange={(e) => handleOnChange(e.target.value)}
          value={value}
          isFocus
          type="text"
          id="name"
        />
      </div>
      <Buttons>
        <Button handleOnClick={handleEditTask}>Изменить</Button>
        <Button handleOnClick={onClose}>Отменить</Button>
      </Buttons>
    </Container>
  );
};

export const EditTask = ({
  editTask,
  handleOnChange,
  value,
}: Omit<FormProps, 'onClose'>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button handleOnClick={() => setIsOpen(true)}>Изменить</Button>
      <Portal isOpen={isOpen} onClose={handleOnClose}>
        <Form
          onClose={handleOnClose}
          editTask={editTask}
          handleOnChange={handleOnChange}
          value={value}
        />
      </Portal>
    </div>
  );
};
