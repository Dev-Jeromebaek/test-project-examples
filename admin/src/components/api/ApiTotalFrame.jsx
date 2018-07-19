import React, { Component } from 'react';
import ApiTotalList from './ApiTotalList';
import { WettyConsumer } from '../../Store';

class ApiTotalFrame extends Component {
  static defaultProps = {
    ApiLists: [],
  };
  render() {
    return (
      <WettyConsumer>
        {value => {
          const { ApiLists } = value.state;
          if (!ApiLists) return null;
          console.log('rendering apiList');

          const list = ApiLists.map(api => (
            <ApiTotalList api={api} key={api.apiId} />
          ));
          return <div>{list}</div>;
        }}
      </WettyConsumer>
    );
  }
}

export default ApiTotalFrame;
