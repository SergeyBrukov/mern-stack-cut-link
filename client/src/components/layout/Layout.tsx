import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
