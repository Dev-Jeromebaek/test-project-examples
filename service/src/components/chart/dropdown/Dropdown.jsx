import React, { Component, Fragment } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Dropdown extends Component {
  state = {
    dropdownOpen: false
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  render() {
    return (
      <Fragment>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret size="sm" outline color="info">
            갱신주기 설정
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>10 minutes</DropdownItem>
            <DropdownItem>30 minutes</DropdownItem>
            <DropdownItem>1 hours</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>set initial</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        &nbsp;&nbsp;&nbsp;
      </Fragment>
    );
  }
}

export default Dropdown;
