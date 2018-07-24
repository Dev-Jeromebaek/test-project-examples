import React, { Component } from 'react';
import ApiDetailInfo from './ApiDetailInfo';
import { WettyConsumer } from '../../Store';

class ApiDetailFrame extends Component {
  render() {
    return (
      <WettyConsumer>
        {value => {
          const urlId = this.props.match.params.id;
          const { adminApiList } = value.state;
          const { actions } = value;
          if (!adminApiList) return null;
          return (
            <ApiDetailInfo
              api={adminApiList.filter(
                api => api.apiId === parseInt(urlId, 10),
              )}
              onRemove={actions.handleRemoveApi}
              onUpdate={actions.handleUpdateApi}
            />
          );
        }}
      </WettyConsumer>
    );
  }
}

export default ApiDetailFrame;
