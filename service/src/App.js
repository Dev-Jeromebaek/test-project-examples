import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard, DashboardList, RGLTest, ResponsiveRGLTest } from './pages';
import { WettyProvider } from './Store';
import GlobalNavbar from './components/global/GlobalNavbar';
import ChartCard from './components/chart/ChartCard';

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalNavbar />
        <WettyProvider>
          <Switch>
            <Route exact path="/" component={DashboardList} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/RGLTest" component={RGLTest} />
            <Route path="/ResponsiveRGLTest" component={ChartCard} />
          </Switch>
        </WettyProvider>
      </Fragment>
    );
  }
}

export default App;
