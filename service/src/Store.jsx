import React, { Component, createContext } from 'react';
import axios from 'axios';
const Store = createContext();
const { Provider, Consumer: WettyConsumer } = Store;

class WettyProvider extends Component {
  state = {
    dashboardList: [],
  };

  actions = {};

  async componentDidMount() {
    const dashboardList = await axios.get(
      'http://10.5.220.246:8080/dashboard_list',
    );

    this.setState({
      dashboardList: dashboardList.data,
    });
  }

  render() {
    const { state, actions } = this;

    const value = {
      state,
      actions,
    };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { WettyProvider, WettyConsumer };
