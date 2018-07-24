import React, { Component } from 'react';
import { WettyConsumer } from '../../Store';
import ApiDetail from './ApiDetail';

class ApiDetailInfo extends Component {
  // api = this.props.api;

  // handleRemoveApi = () => {
  //   const { api, onRemove } = this.props;
  //   // console.log(api);
  //   onRemove(api[0].apiId);
  // };

  // handleUpdateApi = () => {
  //   const { api, onUpdate } = this.props;
  //   onUpdate(api[0].apiId, api[0]);
  // };
  render() {
    console.log(this.props.api[0]);
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
