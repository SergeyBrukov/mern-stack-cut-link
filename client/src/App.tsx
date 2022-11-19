import React, { useState } from 'react';
import RouterBlock from './components/routers/RouterBlock';
import 'materialize-css';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/authHook';

const App = () => {
  const { token, login, setToken, userID, logout } = useAuth();
  const isAuthenticated = !!token;
  console.log(isAuthenticated);

  return (
    <AuthContext.Provider value={{ token, userID, login, logout, setToken, isAuthenticated }}>
      <RouterBlock />;
    </AuthContext.Provider>
  );
};

export default App;
