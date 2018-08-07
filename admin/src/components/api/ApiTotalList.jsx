import React, { Component } from 'react';
import ApiDetail from './ApiDetail';
import { apiContext } from '../../store/ApiStore';

import { UncontrolledCollapse, Button, Badge } from 'reactstrap';

class ApiTotalList extends Component {
  state = {
    isActive: false,
    apiDetail: {},
  };

  async componentDidMount() {
    await this.props.value.actions.getApiDetail(this.props.api.apiId);
    this.setState({
      apiDetail: this.props.value.state.apiDetail,
    });
  }

  handleBtnActive = async () => {
    this.setState({
      isActive: !this.state.isActive,
    });
  };

  render() {
    const { api } = this.props;

    return (
      <div className="mb-3">
        <Button
          id={'toggler' + this.props.api.apiId}
          color="light"
          className={
            this.state.isActive
              ? 'mb-1 w-100 text-left shadow active'
              : 'mb-1 w-100 text-left shadow'
          }
          onClick={this.handleBtnActive}
        >
          <div className="d-flex align-items-center">
            <div className="w-35">
              <Badge color="info">GET</Badge>
              {api.isUsedApi === 'T' ? (
                <span className="ml-1 badge badge-primary">사용</span>
              ) : (
                <span className="ml-1 badge badge-danger">미사용</span>
              )}
            </div>
            <div className="w-65 word-break-all-white-space-normal">
              {api.requestUrl}
            </div>
          </div>
        </Button>
        <UncontrolledCollapse
          toggler={'#toggler' + this.props.api.apiId}
          className="shadow"
        >
          {this.state.apiDetail && (
            <ApiDetail apiDetail={this.state.apiDetail} />
          )}
        </UncontrolledCollapse>
      </div>
    );
  }
}
export default apiContext(ApiTotalList);
