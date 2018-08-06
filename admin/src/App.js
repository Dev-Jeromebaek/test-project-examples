import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { DashboardProvider } from './store/DashboardStore';
import { ApiProvider } from './store/ApiStore';
import { ModalProvider } from './store/ModalStore';
import GlobalNavbar from './components/global/GlobalNavbar';
import { Container } from 'reactstrap';

import { Dashboard, Api, Error } from './pages';

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalNavbar />
        <Container className="mt-4 mb-4">
          <DashboardProvider>
            <ModalProvider>
              <Route exact path="/" component={Dashboard} />
              <Route path="/dashboard" component={Dashboard} />
            </ModalProvider>
          </DashboardProvider>
          <ApiProvider>
            <ModalProvider>
              <Route path="/api" component={Api} />
            </ModalProvider>
          </ApiProvider>
        </Container>
      </Fragment>
    );
  }
}

export default App;
