interface StaticRoutes {
  todo: string;
  signup: string;
  signin: string;
}

type Path = () => string;

interface ApiRoutes {
  baseUrl: Path;
  login: Path;
  signup: Path;
  todos: Path;
  refresh: Path;
}

export const staticRoutes: StaticRoutes = {
  todo: '/',
  signup: '/signup',
  signin: '/signin',
};

const base = '/api';

export const apiRoutes: ApiRoutes = {
  baseUrl: () => base,
  login: () => [base, 'login'].join('/'),
  signup: () => [base, 'register'].join('/'),
  todos: () => [base, 'todos'].join('/'),
  refresh: () => [base, 'refresh'].join('/')
};
