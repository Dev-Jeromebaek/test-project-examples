import React, { Component } from 'react';
import { WettyConsumer } from '../../Store';
import ApiDetail from './ApiDetail';

class ApiDetailInfo extends Component {
  render() {
    // console.log(this.props.api[0]);
    return (
      <WettyConsumer>
        {value => {
          return <ApiDetail apiDetail={value.state.apiDetail} />;
        }}
      </WettyConsumer>
    );
  }
}

export default ApiDetailInfo;
