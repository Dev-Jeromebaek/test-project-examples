import React, { Component } from 'react';
import ApiDetailInfo from './ApiDetailInfo';
import { WettyConsumer } from '../../Store';

class ApiDetailFrame extends Component {
  render() {
    return (
      <WettyConsumer>
        {value => {
          const {
            params: { id },
          } = this.props.match;
          const {
            actions,
            state: { adminApiList },
          } = value;
          return (
            adminApiList && (
              <ApiDetailInfo
                api={adminApiList.filter(api => api.apiId === parseInt(id, 10))}
                onRemove={actions.handleRemoveApi}
                onUpdate={actions.handleUpdateApi}
              />
            )
          );
        }}
      </WettyConsumer>
    );
  }
}

export default ApiDetailFrame;
