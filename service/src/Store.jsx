import React, { Component, createContext } from 'react';
import axios from 'axios';

const Store = createContext();
const { Provider, Consumer: WettyConsumer } = Store;

class WettyProvider extends Component {
  actions = {
    getDashboardList: async () => {
      return await axios.get('/proxy/dashboard');
    },

    getDashboardOne: async (id, pageNum) => {
      return await axios.get(`/proxy/dashboard/${id}`);
      // return await axios.get(`/proxy/dashboard/${id}?page=${pageNum}`);
    },

    getGraphOne: async (dashboardNo, graphId) => {
      return await axios.get(
        `/proxy/dashboard/${dashboardNo}/graph/${graphId}`,
      );
    },

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

    removeLocalStorage(dashboardList) {
      if (dashboardList.length === 0) {
        for (var i = 0, len = global.localStorage.length; i < len; i++) {
          global.localStorage.removeItem(global.localStorage.key(i));
        }
      } else {
        for (var k = 0; k < global.localStorage.length; k++) {
          for (var j = 0; j < dashboardList.length; j++) {
            if (
              String(dashboardList[j].dashboardId) !==
              global.localStorage
                .key(k)
                .split('_')[0]
                .split('-')[1]
            ) {
              global.localStorage.removeItem(global.localStorage.key(k));
              break;
            }
          }
        }
      }
    },
  };

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
