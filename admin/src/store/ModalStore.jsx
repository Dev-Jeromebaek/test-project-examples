import React, { Component, createContext } from 'react';
import axios from 'axios';
const ModalStore = createContext();
const { Provider, Consumer: ModalConsumer } = ModalStore;

class ModalProvider extends Component {
  state = {
    dashboardInputInfo: {},
    grpahInputInfo: {},
    usingApiId: '',
  };

  actions = {
    getDataTypeListByApiId: async (type, apiId) => {
      return await axios.get(
        `/dashboard/management/graph/axis?type=${type}&apiId=${apiId}`,
      );
    },

    getBaseTypeListByApiId: async apiId => {
      return await axios.get(
        `/dashboard/management/graph/axis?type=&apiId=${apiId}`,
      );
    },

    createDashboard: async () => {
      const {
        dashboardName,
        dashboardDescription,
        apiId,
      } = this.state.dashboardInputInfo;

      if (
        dashboardName === undefined ||
        dashboardDescription === undefined ||
        apiId === undefined
      ) {
        return false;
      } else {
        try {
          await axios.post('/dashboard/management', {
            ...this.state.dashboardInputInfo,
          });

          this.state.usingApiId = apiId;
          console.log(this.state.usingApiId);
          return true;
        } catch (e) {
          alert(e);
        }
      }
    },

    editDashboard: () => {
      alert('대시보드 수정');
    },

    editGraph: () => {
      alert('그래프 수정');
    },

    deleteGraph: () => {
      alert('삭제');
    },
    createGraph: () => {
      alert('생성');
    },
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

const modalContext = Component => {
  return props => {
    return (
      <ModalConsumer>
        {value => {
          return <Component {...props} value={value} />;
        }}
      </ModalConsumer>
    );
  };
};

export { ModalProvider, ModalConsumer, modalContext };
