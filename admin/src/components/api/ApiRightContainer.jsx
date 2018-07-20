import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ApiDetailFrame from './ApiDetailFrame';
import ApiTotalFrame from './ApiTotalFrame';

const ApiRightContainer = () => {
  return (
    <Switch>
      <Route exact path="/api" component={ApiTotalFrame} />
      <Route path="/api/:id" component={ApiDetailFrame} />
    </Switch>
  );
};

export default ApiRightContainer;
