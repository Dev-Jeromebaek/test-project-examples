import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';
import logo from '../../public/icons/logo.svg';
import GlobalNavbarSelectTab from './GlobalNavbarSelectTab';

export default class GlobalNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <div style={{ height: '66px' }} />
        <Navbar className="fixed-top shadow-sm bg-light" light expand="md">
          <NavbarBrand href="/">
            <img src={logo} width="100" alt="TMON logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <GlobalNavbarSelectTab />
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
