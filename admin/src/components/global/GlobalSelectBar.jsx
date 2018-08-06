import React from 'react';
import {
  Dropdown,
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

  renderDropDownItem() {
    const { dataList, handleSelectChange, name } = this.props;

    if (dataList[0].apiId === undefined) {
      return dataList.map((data, i) => {
        return (
          <DropdownItem
            key={i}
            data-code={data.code}
            onClick={handleSelectChange}
            name={name}
          >
            {data.title}
          </DropdownItem>
        );
      });
    } else {
      return dataList.map((data, i) => {
        return (
          <DropdownItem
            key={i}
            onClick={handleSelectChange}
            name={name}
            id={data.apiId}
          >
            {data.apiName}
            &nbsp;&nbsp;{data.requestUrl}
          </DropdownItem>
        );
      });
    }
  }

  render() {
    const { dropdownOpen } = this.state;
    const { title, selectedData, listTitle, dataList } = this.props;

    return (
      <div className="p-2">
        <div className="text-muted font-weight-bold font-size">{title}</div>
        <Dropdown
          className="w-100 input-description"
          isOpen={dropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle
            className="dropDownSelectBar w-100 text-left p-0 font-size"
            caret
          >
            {selectedData}
          </DropdownToggle>
          <DropdownMenu className="font-size w-100">
            <DropdownItem header>{listTitle}</DropdownItem>
            {dataList.length === 0 ? (
              <div className="font-size px-4 text-center text-muted">
                사용 가능한 데이터가 없습니다.
              </div>
            ) : (
              this.renderDropDownItem()
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}
