import React from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default class GlobalSelectBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <div className="p-2">
        <div className="text-muted font-weight-bold fontSize">
          {this.props.title}
        </div>
        <ButtonDropdown
          className="buttonDropDown w-100 input-description"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle
            className="dropDownSelectBar w-100 text-left p-0 fontSize"
            caret
          >
            {this.props.selectedData}
          </DropdownToggle>
          <DropdownMenu className="fontSize w-100">
            <DropdownItem header>{this.props.listTitle}</DropdownItem>
            {this.props.apiList.map((api, i) => {
              return (
                <DropdownItem key={i} onClick={this.props.handleSelectChange}>
                  {api.apiName}
                  {api.requestUrl}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}
