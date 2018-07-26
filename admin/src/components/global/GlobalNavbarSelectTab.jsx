import React from 'react';
import { Nav, NavItem } from 'reactstrap';

import { NavLink as RouterLink } from 'react-router-dom';

class GlobalNavbarSelectTab extends React.Component {
  render() {
    const isRoot =
      window.location.href.charAt(window.location.href.length - 1) === '/';
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <RouterLink className="nav-link" to="/api">
            API
          </RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink
            className={isRoot ? 'nav-link active' : 'nav-link'}
            to="/dashboard"
          >
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
}
export default GlobalNavbarSelectTab;
