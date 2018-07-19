import React from 'react';
import { Nav, NavItem } from 'reactstrap';

import { NavLink as RouterLink } from 'react-router-dom';

export default function GlobalNavbarSelectTab() {
  return (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <RouterLink className="nav-link" to="/api">
          API
        </RouterLink>
      </NavItem>
      <NavItem>
        <RouterLink className="nav-link" to="/dashboard">
          Dashboard
        </RouterLink>
      </NavItem>
      <NavItem>
        <RouterLink className="nav-link" to="/test">
          ModalTest
        </RouterLink>
      </NavItem>
    </Nav>
  );
}
