import React, { FC } from 'react';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Layout from '../layout/Layout';
import NotFound404 from '../not-found/NotFound404';
import { useRoutes } from './routers';

const RouterBlock: FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const routers = useRoutes(isAuthenticated);
  console.log(isAuthenticated);

  console.log(routers);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routers.map(({ path, element }) => (
          <Route path={path} element={element} key={path} />
        ))}
        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  );
};

export default RouterBlock;
