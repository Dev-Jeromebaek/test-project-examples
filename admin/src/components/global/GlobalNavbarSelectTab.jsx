import React from 'react';
import { Nav, NavItem } from 'reactstrap';

import { NavLink as RouterLink } from 'react-router-dom';

class GlobalNavbarSelectTab extends React.Component {
  state = {
    navbarToggler: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ navbarToggler: window.innerWidth < 768 });
  }

  render() {
    const isRoot =
      window.location.href.charAt(window.location.href.length - 1) === '/';
    let addToggle = null;

    if (this.state.navbarToggler) {
      addToggle = this.props.toggle;
    }

    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <RouterLink className="nav-link" to="/api" onClick={addToggle}>
            API
          </RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink
            className={isRoot ? 'nav-link active' : 'nav-link'}
            to="/dashboard"
            onClick={addToggle}
          >
            Dashboard
          </RouterLink>
        </NavItem>
      </Nav>
    );
  }
}
export default GlobalNavbarSelectTab;
