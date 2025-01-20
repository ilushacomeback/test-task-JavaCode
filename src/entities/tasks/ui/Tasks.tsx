import {
  selectors,
  useAppDispatch,
  useAppSelector,
  useEditTask,
  useGetTasks,
  useRemoveTask,
} from '@/shared';
import { Task } from './Task';
import { RemoveTask } from './RemoveTask';
import { EditTask } from './EditTask';
import { PropsWithChildren, useEffect, useState } from 'react';
import { authApi } from '@/shared/api/auth';
import styled from 'styled-components';

const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 10px;
  border-radius: 10px;
  background: rgba(207, 207, 207, 0.7);
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Tasks = ({ children }: PropsWithChildren) => {
  const userId = useAppSelector(selectors.authSelectors.selectId);
  const tasks = useAppSelector(selectors.todoSelectors.selectTodos);
  const error = useAppSelector(selectors.todoSelectors.selectError);
  const [value, setValue] = useState<string>('');
  const [editTask] = useEditTask();
  const [removeTask] = useRemoveTask();
  const dispatch = useAppDispatch();

  const handleEditTask = (id: number) => (name: string) => {
    editTask({ id, name });
  };

  const { isLoading, refetch } = useGetTasks(userId, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (error) {
      const refresh = async () => {
        const result = await dispatch(
          authApi.endpoints.refresh.initiate(undefined)
        );
        if (!result.error) {
          refetch();
        }
      };
      refresh();
    }
  }, [error, dispatch, refetch]);

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (tasks.length === 0) {
    return <div>Добавьте свою первую задачу</div>;
  }
  return (
    <Ul>
      {tasks.map((task) => (
        <Task {...task} key={task.id}>
          <ButtonsContainer>
            <RemoveTask removeTask={() => removeTask(task.id)} />
            <EditTask
              editTask={handleEditTask(task.id)}
              value={value}
              handleOnChange={setValue}
            />
          </ButtonsContainer>
          {children}
        </Task>
      ))}
    </Ul>
  );
};
