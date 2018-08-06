import React, { Component } from 'react';
import { DropdownToggle, DropdownMenu, Dropdown, ListGroup } from 'reactstrap';
import ApiMyUseList from './ApiMyUseList';
import { apiContext } from '../../store/ApiStore';
import GlobalSpinner from '../global/GlobalSpinner';

class ApiMyUseFrame extends Component {
  state = {
    isDropdownOpened: false,
    usingApiName: '',
  };

  async componentDidMount() {
    await this.props.value.actions.getMyApiList();
  }

  toggle = () => {
    this.setState(prevState => ({
      isDropdownOpened: !prevState.isDropdownOpened,
    }));
  };

  clickMyApi = name => () => {
    this.setState({
      usingApiName: name,
    });
  };

  render() {
    const { isResponsive } = this.props;
    let list = null;

    if (isResponsive) {
      list = (
        <Dropdown isOpen={this.state.isDropdownOpened} toggle={this.toggle}>
          <DropdownToggle
            className="btn btn-outline-secondary w-100 word-break-all-white-space-normal"
            caret
          >
            {this.state.usingApiName === '' ||
            this.props.history.location.pathname === '/api'
              ? '사용 중인 API 리스트'
              : this.state.usingApiName}
          </DropdownToggle>
          <DropdownMenu className="w-100">
            {this.props.value.state.myApiList.map(info => (
              <ApiMyUseList
                history={this.props.history}
                key={info.apiId}
                info={info}
                isDropdown={true}
                clickMyApi={this.clickMyApi(info.apiName)}
                toggle={this.toggle}
              />
            ))}
          </DropdownMenu>
        </Dropdown>
      );
    } else {
      list = (
        <ListGroup className="shadow" style={{ overflowY: 'auto' }}>
          {this.props.value.state.myApiList.map(info => (
            <ApiMyUseList
              history={this.props.history}
              key={info.apiId}
              info={info}
              clickMyApi={this.clickMyApi(info.apiName)}
            />
          ))}
        </ListGroup>
      );
    }

    return this.props.value.state.isMyApiListLoading ? <GlobalSpinner /> : list;
  }
}

export default apiContext(ApiMyUseFrame);
