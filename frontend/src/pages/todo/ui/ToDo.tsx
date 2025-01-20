import { selectors, useAppSelector, staticRoutes } from '@/shared';
import { ToDoWidget } from '@/widgets';
import { Navigate } from 'react-router';

export const ToDo = () => {
  const token = useAppSelector(selectors.authSelectors.selectToken);

  if (!token) {
    return <Navigate to={staticRoutes.signin} />;
  }

  return <ToDoWidget />;
};
