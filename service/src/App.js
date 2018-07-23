import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from './pages';

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Container>
    );
  }
}

export default App;
