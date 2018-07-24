import React, { Component } from 'react';
import ApiTotalList from './ApiTotalList';
import { WettyConsumer } from '../../Store';

class ApiTotalFrame extends Component {
  static defaultProps = {
    ApiLists: [],
    adminApiList: [],
  };
  render() {
    return (
      <WettyConsumer>
        {value => {
          const { adminApiList } = value.state;
          if (!adminApiList) return null;
          console.log('rendering apiList');

          const list = adminApiList.map(api => (
            <ApiTotalList api={api} key={api.apiId} />
          ));
          return <div>{list}</div>;
        }}
      </WettyConsumer>
    );
  }
}

export default ApiTotalFrame;
