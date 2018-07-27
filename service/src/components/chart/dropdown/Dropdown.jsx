import React, { Component, Fragment } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class Dropdown extends Component {
  state = {
    dropdownOpen: false,
    cycleTitle: '갱신주기 설정',
    cycleOption: ['10 minutes', '30 minutes', '1 hours'],
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  hi = e => {
    console.log('dd');
  };
  handleSetCycle = e => {
    e.stopPropagation();
    console.log(e.target.value);
    this.setState({
      cycleOption: e.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            caret
            size="sm"
            outline
            color="info"
            onMouseDown={e => {
              e.stopPropagation();
            }}
          >
            {this.state.cycleOption}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.handleSetCycle}>
              10 minutes
            </DropdownItem>
            <DropdownItem onClick={this.handleSetCycle}>
              30 minutes
            </DropdownItem>
            <DropdownItem onClick={this.handleSetCycle}>1 hours</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.handleSetCycle}>
              set initial
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        &nbsp;&nbsp;&nbsp;
      </Fragment>
    );
  }
}

export default Dropdown;
