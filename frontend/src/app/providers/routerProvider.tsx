import { BrowserRouter, Routes, Route } from 'react-router';
import { SignIn, SignUp, ToDo } from '@/pages';
import { Input, staticRoutes } from '@/shared';
import { ChangeEvent, PropsWithChildren, useState } from 'react';

export const RouterProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<string>('');
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setState(e.target.value);
  console.log(state);
  return (
    <BrowserRouter>
      {children}
      <main>
        <Routes>
          <Route path={staticRoutes.signup} element={<SignUp />}></Route>
          <Route path={staticRoutes.signin} element={<SignIn />}></Route>
          <Route path={staticRoutes.todo} element={<ToDo />}></Route>
          <Route
            path="/test"
            element={<Input type="text" handleOnChange={handleOnChange} />}
          ></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};
