import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <div className="header">
    <h1 className="header__title">Santa list</h1>
    <div className="header__menu">
      <NavLink to="/gift" className="menu__item">
        Gifts
      </NavLink>{' '}
      |{' '}
      <NavLink to="/child" className="menu__item">
        Children
      </NavLink>
    </div>
  </div>
);
