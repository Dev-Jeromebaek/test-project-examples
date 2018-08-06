import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { apiContext } from '../../store/ApiStore';
import GlobalConfirmModal from '../global/GlobalConfirmModal';

class ApiMyUseList extends Component {
  state = {
    listOn: false,
    removeOn: false,
  };

  onListEnterHandler = () => {
    this.setState({
      listOn: true,
    });
  };

  onListLeaveHandler = e => {
    this.setState({
      listOn: false,
    });
  };

  onDelBtnEnterHandler = () => {
    this.setState({
      removeOn: true,
    });
  };

  onDelBtnLeaveHandler = e => {
    this.setState({
      removeOn: false,
    });
  };
  onChangeApi = () => {
    // alert('AA');
    console.log(this.props.info.apiId);
    const { onChangeId } = this.props;
    onChangeId(this.props.info.apiId);
  };

  goApi = () => {
    this.props.history.push('/api');
  };

  goApiDetail = () => {
    this.props.history.push(`/api/${this.props.info.apiId}`);
  };

  render() {
    const { info, isDropdown, clickMyApi, toggle } = this.props;
    const { deleteMyApi } = this.props.value.actions;
    return isDropdown ? (
      <div
        className={
          info.apiId ===
          parseInt(this.props.history.location.pathname.split('/')[2], 10)
            ? 'text-dark active cursor-pointer nav-link dropdown-item word-break-all-white-space-normal'
            : 'cursor-pointer nav-link dropdown-item word-break-all-white-space-normal'
        }
        onMouseEnter={this.onListEnterHandler}
        onMouseLeave={this.onListLeaveHandler}
        onClick={() => {
          clickMyApi();
          toggle();
          this.goApiDetail();
        }}
      >
        {info.apiName}
      </div>
    ) : (
      <ListGroupItem
        className={
          info.apiId ===
          parseInt(this.props.history.location.pathname.split('/')[2], 10)
            ? 'd-flex align-items-center cursor-pointer text-dark active'
            : 'd-flex align-items-center cursor-pointer text-dark'
        }
        onMouseEnter={this.onListEnterHandler}
        onMouseLeave={this.onListLeaveHandler}
        onClick={() => {
          this.goApiDetail();
          clickMyApi();
        }}
      >
        <div className="w-80 text-align-justify word-break-all-white-space-normal">
          {info.apiName}
        </div>
        <div className="ml-auto">
          {this.state.listOn && (
            <GlobalConfirmModal
              onListMouseEnter={this.onDelBtnEnterHandler}
              onListMouseLeave={this.onDelBtnLeaveHandler}
              goApi={this.goApi}
              deleteMyApi={() => {
                deleteMyApi(info);
              }}
              isHovered={true}
            />
          )}
        </div>
      </ListGroupItem>
    );
  }
}

export default apiContext(ApiMyUseList);
