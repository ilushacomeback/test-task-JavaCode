import { useEditTask } from '@/shared';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export interface TaskProps extends PropsWithChildren {
  name: string;
  id: number;
  state: 'completed' | 'uncompleted';
  userId: string;
}

const Li = styled.li`
  background: rgba(254, 254, 254, 0.7);
  padding: 10px 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const StateContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow: auto;
`;

export const Task = ({ name, state, children, id }: TaskProps) => {
  const [setState] = useEditTask();
  return (
    <Li>
      <StateContainer>
        <input
          type="checkbox"
          id="check"
          checked={state === 'completed'}
          onChange={() =>
            setState({
              state: state === 'completed' ? 'uncompleted' : 'completed',
              id,
            })
          }
        />
        <label
          htmlFor="check"
          style={{
            textDecoration: state === 'completed' ? 'line-through' : 'none',
            padding: '5px'
          }}
        >
          {name}
        </label>
      </StateContainer>
      {children}
    </Li>
  );
};
