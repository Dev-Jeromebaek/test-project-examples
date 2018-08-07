import React from 'react';
import { Nav, NavItem } from 'reactstrap';

const GlobalNavbarSelectTab = () => {
  return (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <a className="nav-link text-white" href="">
          Admin
        </a>
      </NavItem>
    </Nav>
  );
};

export default GlobalNavbarSelectTab;
