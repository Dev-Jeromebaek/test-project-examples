import React from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default class GlobalSelectBar extends React.Component {
  state = {
    dropdownOpen: false,
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  render() {
    const { dropdownOpen } = this.state;
    const {
      title,
      selectedData,
      listTitle,
      handleSelectChange,
      dataList,
      name,
    } = this.props;

    return (
      <div className="p-2">
        <div className="text-muted font-weight-bold fontSize">{title}</div>
        <ButtonDropdown
          className="buttonDropDown w-100 input-description"
          isOpen={dropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle
            className="dropDownSelectBar w-100 text-left p-0 fontSize"
            caret
          >
            {selectedData}
          </DropdownToggle>
          <DropdownMenu className="fontSize w-100">
            <DropdownItem header>{listTitle}</DropdownItem>
            {dataList.map((data, i) => {
              return (
                <DropdownItem key={i} onClick={handleSelectChange} name={name}>
                  {data.apiName}
                  {data.requestUrl}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}
