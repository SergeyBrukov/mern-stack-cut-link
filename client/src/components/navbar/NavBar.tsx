import React, { MouseEvent, useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { handleAuthnavBarRouters } from './navbarRouters';

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navBarRouters = useMemo(() => handleAuthnavBarRouters(isAuthenticated), [isAuthenticated]);

  const logoutHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 15px' }}>
        <NavLink to="/" className="brand-logo">
          Logo
        </NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {navBarRouters?.map(({ to, name }) => (
            <li>
              <NavLink to={to}>{name}</NavLink>
            </li>
          ))}
          {isAuthenticated && (
            <li style={{ cursor: 'pointer' }}>
              <a onClick={logoutHandler}>Logout</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
