import React, { Component } from 'react';
import { Navbar, NavbarToggler, Collapse } from 'reactstrap';
import logo from '../../public/icons/logo.svg';
import GlobalNavbarSelectTab from './GlobalNavbarSelectTab';
import { NavLink as RouteLink } from 'react-router-dom';

export default class GlobalNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div>
        <div style={{ height: '59.02px' }} />
        <Navbar className="fixed-top shadow-sm bg-light" light expand="md">
          <RouteLink className="" to="/">
            <img src={logo} width="100" alt="TMON logo" />
          </RouteLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <GlobalNavbarSelectTab toggle={this.toggle} />
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
