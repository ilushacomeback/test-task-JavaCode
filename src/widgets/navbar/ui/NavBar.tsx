import {
  actions,
  selectors,
  staticRoutes,
  useAppDispatch,
  useAppSelector,
} from '@/shared';
import { NavLink } from 'react-router';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  background: rgba(117, 117, 117, 0.8);
  padding: 20px;
`

export const NavBar = () => {
  const token = useAppSelector(selectors.authSelectors.selectToken);
  const dispatch = useAppDispatch();

  return (
    <header>
      <Nav>
        {token ? (
          <button onClick={() => dispatch(actions.logout())}>Выйти</button>
        ) : (
          <>
            <NavLink to={staticRoutes.signin}>Войти</NavLink>
            <NavLink to={staticRoutes.signup}>Регистрация</NavLink>
          </>
        )}
      </Nav>
    </header>
  );
};
