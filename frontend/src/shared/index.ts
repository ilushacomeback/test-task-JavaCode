export { staticRoutes, apiRoutes } from './routes/routes';
export { store, actions, selectors } from '@/app/model/store/store';
export { Input } from './ui/Input';
export { Button } from './ui/Button';
export { Label } from './ui/Label';
export { Portal } from './ui/Portal';
export { Form } from './ui/Form'
export { useLogin, useRegister } from './api/auth';
export {
  useAppDispatch,
  useAppSelector,
  useAppStore,
} from './hooks/typesHooks';

export {
  useAddTask,
  useEditTask,
  useGetTasks,
  useRemoveTask,
} from './api/todo';
