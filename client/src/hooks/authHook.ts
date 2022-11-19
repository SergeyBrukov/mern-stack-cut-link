import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = (jwtToken: string, id: string) => {
    console.log('RerenderZ');

    setToken(jwtToken);
    setUserID(id);
    localStorage.setItem('userData', jwtToken);
  };

  const logout = () => {
    setToken(null);
    setUserID(null);
    localStorage.removeItem('userData');
    navigate('/');
  };

  useEffect(() => {
    const data = localStorage.getItem('userData');
    console.log('dara>>', data);

    if (data) {
      setToken(data);
      login(data, '');
    }
  }, []);

  return { token, login, setToken, logout, userID };
};
