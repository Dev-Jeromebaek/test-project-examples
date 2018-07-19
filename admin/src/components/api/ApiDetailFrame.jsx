import React, { Component } from 'react';
import ApiDetailInfo from './ApiDetailInfo';
import { WettyConsumer } from '../../Store';

class ApiDetailFrame extends Component {
  render() {
    return (
      <WettyConsumer>
        {value => {
          const urlId = this.props.match.params.id;
          const { ApiLists } = value.state;
          const { handleRemoveApi, handleUpdateApi } = value;
          if (!ApiLists) return null;
          console.log('rendering apiList');
          // console.log(urlId);
          // console.log(ApiLists);
          return (
            <ApiDetailInfo
              api={ApiLists.filter(api => api.apiId === urlId)}
              onRemove={handleRemoveApi}
              onUpdate={handleUpdateApi}
            />
          );
        }}
      </WettyConsumer>
    );
  }
}

export default ApiDetailFrame;
