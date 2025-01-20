import { FormEvent, useState } from 'react';
import {
  selectors,
  useAddTask,
  useAppSelector,
  Button,
  Input,
  Label,
} from '@/shared';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StateContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const Form = ({ onClose }: { onClose: () => void }) => {
  const userId = useAppSelector(selectors.authSelectors.selectId);
  const [addTask] = useAddTask();
  const [name, setName] = useState<string>('');
  const [state, setState] = useState<boolean>(false);

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isCompleted = state ? 'completed' : 'uncompleted';
    const data = { name, state: isCompleted, userId };
    await addTask(data);
    onClose();
  };

  return (
    <FormContainer onSubmit={handleOnSubmit}>
      <div>
        <Label htmlFor="name" hidden>
          Задача
        </Label>
        <Input
          type="text"
          id="name"
          value={name}
          placeholder="Введите название..."
          isFocus
          handleOnChange={(e) => setName(e.target.value)}
        />
      </div>
      <StateContainer>
        <Input
          type="checkbox"
          id="state"
          checked={state}
          handleOnChange={(e) => setState(e.target.checked)}
        />
        <Label htmlFor="state">Завершено</Label>
      </StateContainer>
      <div>
        <Button type="submit">Добавить</Button>
      </div>
    </FormContainer>
  );
};
