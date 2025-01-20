import { FormEvent, useState } from 'react';
import { Input, Button, Label, useRegister, staticRoutes, Form } from '@/shared';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

interface ResponseError {
  email?: string;
  password?: string;
  username?: string;
}

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


export const SignUp = () => {
  const [username, setUserame] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<ResponseError>({});
  const [register] = useRegister();
  const navigate = useNavigate();

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    const response = await register({ email, password, username });
    setIsLoading(false)
    if (response.error) {
      setErrors((response?.error as { data: ResponseError })?.data);
      return;
    }
    navigate(staticRoutes.todo);
  };

  return (
    <Form onSubmit={handleOnSubmit} noValidate>
      <Div>
        <Label htmlFor="username">Имя</Label>
        <Input
          type="text"
          handleOnChange={(e) => setUserame(e.target.value)}
          id="username"
          isFocus
          value={username}
          style={{ borderColor: errors?.username && 'red' }}
        />
        {errors?.email && <Span>{errors?.username}</Span>}
      </Div>
      <Div>
        <Label htmlFor="email">Почта</Label>
        <Input
          type="email"
          handleOnChange={(e) => setEmail(e.target.value)}
          id="email"
          value={email}
          style={{ borderColor: errors?.email && 'red' }}
        />
        {errors?.email && <Span>{errors?.email}</Span>}
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
      <div>
        <Button type="submit" disabled={isLoading}>Зарегистрироваться</Button>
      </div>
    </Form>
  );
};
