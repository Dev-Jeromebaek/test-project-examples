import React, { Component, Fragment } from 'react';
import { apiContext } from '../../store/ApiStore';
import ApiDetail from './ApiDetail';

class ApiDetailInfo extends Component {
  render() {
    return (
      <Fragment>
        <ApiDetail
          isResponsive={this.props.isResponsive}
          isMyApiDetail={true}
          apiDetail={this.props.apiDetail}
        />
      </Fragment>
    );
  }
}

export default apiContext(ApiDetailInfo);
