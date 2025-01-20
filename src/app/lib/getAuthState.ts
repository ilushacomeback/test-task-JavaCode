interface DefaultState {
  id: null | string;
  accessToken: null | string;
  username: null | string;
}

const getAuthState = (): DefaultState => {
  const user = localStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
  }

  return { id: null, accessToken: null, username: null };
};

export const initialState = getAuthState();
