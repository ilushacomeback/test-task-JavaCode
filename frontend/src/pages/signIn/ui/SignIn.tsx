import { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Input, Button, Label, useLogin, staticRoutes, Form } from '@/shared';
import styled from 'styled-components';

interface ResponseError {
  user?: string;
  password?: string;
}

const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Span = styled.span`
  font-size: 1rem;
  padding-left: 5px;
  color: red;
  margin-top: 3px;
`;

export const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ResponseError>({});
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [login] = useLogin();
  const navigate = useNavigate();

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    const response = await login({ email, password });
    setIsLoading(false)
    if (response?.error) {
      setErrors((response?.error as { data: ResponseError })?.data);
      return;
    }
    navigate(staticRoutes.todo);
  };

  return (
    <Form onSubmit={handleOnSubmit} noValidate>
      <Div>
        <Label htmlFor="email">Почта</Label>
        <Input
          type="email"
          handleOnChange={(e) => setEmail(e.target.value)}
          id="email"
          value={email}
          style={{ borderColor: errors?.user && 'red' }}
          isFocus
        />
        {errors?.user && <Span>{errors?.user}</Span>}
      </Div>
      <Div>
        <Label htmlFor="password">Пароль</Label>
        <Input
          type="text"
          handleOnChange={(e) => setPassword(e.target.value)}
          id="password"
          value={password}
          style={{ borderColor: errors?.password && 'red' }}
        />
        {errors?.password && <Span>{errors?.password}</Span>}
      </Div>
      <ContainerButtons>
        <Button type="submit" disabled={isLoading}>Войти</Button>
        <NavLink to="/signup">Регистрация</NavLink>
      </ContainerButtons>
    </Form>
  );
};
