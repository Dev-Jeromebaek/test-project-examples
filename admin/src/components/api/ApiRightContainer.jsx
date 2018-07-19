import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import ApiDetailFrame from './ApiDetailFrame';
import ApiTotalFrame from './ApiTotalFrame';

class ApiRightContainer extends Component {
  // static defaultProps = {
  //   apiList: [],
  // };

  render() {
    // const { apiList, onUpdate, onRemove } = this.props;
    // if (!apiList) return null;
    // console.log('rendering list');
    // console.log(apiList);
    return (
      <Switch>
        <Route exact path="/api" component={ApiTotalFrame} />
        <Route path="/api/:id" component={ApiDetailFrame} />
      </Switch>
    );
  }
}

export default ApiRightContainer;
