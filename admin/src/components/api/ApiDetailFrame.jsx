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
          // const { adminApiList } = value.state;
          const { handleRemoveApi, handleUpdateApi } = value;
          if (!ApiLists) return null;
          // if (!adminApiList) return null;
          // console.log('rendering apiList');
          return (
            <ApiDetailInfo
              api={ApiLists.filter(api => api.apiId === parseInt(urlId, 10))}
              // api={adminApiList.filter(
              // api => api.apiId === parseInt(urlId, 10),
              // )}
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
