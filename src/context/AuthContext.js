import { createContext, useContext, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const DEMO_USER = { username: 'admin', password: 'movie123' };

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('me_user', null);

  const login = useCallback(
    (username, password) => {
      if (username === DEMO_USER.username && password === DEMO_USER.password) {
        setUser({ username });
        return { ok: true };
      }
      return { ok: false, message: 'Invalid username or password.' };
    },
    [setUser]
  );
  const logout = useCallback(() => setUser(null), [setUser]);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}