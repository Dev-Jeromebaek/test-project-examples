import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const GlobalNavbarSelectTab = () => {
  return (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink className="nav-link text-white" to="/admin">
          Admin
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default GlobalNavbarSelectTab;
