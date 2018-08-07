import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import ApiDetailFrame from './ApiDetailFrame';
import ApiTotalFrame from './ApiTotalFrame';

const ApiRightContainer = ({ checkErr }) => {
  return (
    <Fragment>
      <Route exact path="/api" component={ApiTotalFrame} />
      <Route
        path="/api/:id"
        render={props => <ApiDetailFrame {...props} checkErr={checkErr} />}
      />
    </Fragment>
  );
};

export default ApiRightContainer;
