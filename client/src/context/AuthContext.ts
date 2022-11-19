import { createContext } from 'react';
import { TypeSetState } from '../utils/type';

interface IAuthContext {
  token: string | null;
  setToken?: TypeSetState<string | null>;
  login: (jwtToken: string, userID: string) => void;
  userID: string | null;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  token: '',
  setToken: () => {},
  login: () => {},
  logout: () => {},
  userID: '',
  isAuthenticated: false,
});
