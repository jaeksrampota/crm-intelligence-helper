import { useState, useCallback } from 'react';

const AUTH_KEY = 'crm-auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === '1'
  );
  const [error, setError] = useState<string | null>(null);

  const login = useCallback((username: string, password: string): boolean => {
    if (username === 'admin' && password === '') {
      sessionStorage.setItem(AUTH_KEY, '1');
      setIsAuthenticated(true);
      setError(null);
      return true;
    }
    setError('invalid');
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  return { isAuthenticated, login, logout, error };
}
