import { Tasks } from '@/entities';
import { AddTask } from '@/features';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ToDoWidget = () => {
  return (
    <Container>
      <AddTask />
      <Tasks />
    </Container>
  );
};
