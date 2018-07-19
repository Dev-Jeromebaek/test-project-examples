import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { WettyProvider } from './Store';
import GlobalNavbar from './components/global/GlobalNavbar';
import { Container } from 'reactstrap';

import { Dashboard, Test, Api, Error } from './pages';

class App extends Component {
  render() {
    return (
      <WettyProvider>
        <GlobalNavbar />
        <Container className="mt-4 mb-4">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/test" component={Test} />
            <Route path="/api" component={Api} />
            <Route component={Error} />
          </Switch>
        </Container>
      </WettyProvider>
    );
  }
}

export default App;
