import { useState } from 'react';
import { Form } from './FormAddTask';
import { Button, Portal } from '@/shared';

export const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        handleOnClick={() => {
          setIsOpen(true);
        }}
      >
        Добавить задачу
      </Button>
      <Portal isOpen={isOpen} onClose={handleOnClose}>
        <Form onClose={handleOnClose} />
      </Portal>
    </div>
  );
};
