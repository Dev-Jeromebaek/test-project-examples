import React, { Component, createContext } from 'react';
import axios from 'axios';
const Store = createContext();
const { Provider, Consumer: WettyConsumer } = Store;

class WettyProvider extends Component {
  state = {
    dashboardList: [],
  };

  actions = {
    getFromLocalStorage(key) {
      let localStorage = {};
      if (global.localStorage) {
        try {
          localStorage = JSON.parse(global.localStorage.getItem(key)) || {};
        } catch (e) {
          /*Ignore*/
        }
      }
      return localStorage[key];
    },

    saveToLocalStorage(key, value) {
      if (global.localStorage) {
        global.localStorage.setItem(
          key,
          JSON.stringify({
            [key]: value,
          }),
        );
      }
    },
  };

  async componentDidMount() {
    const dashboardList = await axios.get(
      'http://10.5.220.112:8080/dashboard_list',
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

const withContext = Component => {
  return props => {
    return (
      <WettyConsumer>
        {value => {
          return <Component {...props} value={value} />;
        }}
      </WettyConsumer>
    );
  };
};

export { WettyProvider, WettyConsumer, withContext };
