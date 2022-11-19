import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/authHook';

const NotFound404 = () => {
  const navigate = useNavigate();

  const { token } = useAuth();

  console.log(token);

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate(token ? '/' : '/login');
  //   }, 2000);
  // }, [token]);

  return <div>NotFound404</div>;
};

export default NotFound404;
