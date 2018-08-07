import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DashboardProvider } from './store/DashboardStore';
import { ApiProvider } from './store/ApiStore';
import GlobalNavbar from './components/global/GlobalNavbar';
import { Container } from 'reactstrap';

import { Dashboard, Api, Err } from './pages';

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalNavbar />
        <Container className="mt-4 mb-4">
          <DashboardProvider>
            <ApiProvider>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/api" component={Api} />
                <Route component={Err} />
              </Switch>
            </ApiProvider>
          </DashboardProvider>
        </Container>
      </Fragment>
    );
  }
}

export default App;
