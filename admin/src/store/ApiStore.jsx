import React, { Component, createContext } from 'react';
import axios from 'axios';

const Store = createContext();
const { Provider, Consumer: ApiConsumer } = Store;

class ApiProvider extends Component {
  state = {
    isAscending: true,
    API_DOMAIN: '/admin-dashboard/management',
    apiList: [],
    myApiList: [],
    unusedApiList: [],
    apiDetail: {},
    isApiListLoading: false,
    isMyApiListLoading: false,
    isApiDetailLoading: false,
  };

  actions = {
    getApiList: async () => {
      this.setState({
        isApiListLoading: true,
      });

      const apiList = await axios.get(`${this.state.API_DOMAIN}?display=all`);

      this.setState({
        apiList: await apiList.data.data,
        isApiListLoading: false,
      });
    },
    getMyApiList: async () => {
      this.setState({
        isMyApiListLoading: true,
      });

      const myApiList = await axios.get(`${this.state.API_DOMAIN}?display=use`);

      this.setState({
        myApiList: await myApiList.data.data,
        isMyApiListLoading: false,
      });
    },
    getUnusedApiList: async () => {
      const unusedApiList = await axios.get(
        `${this.state.API_DOMAIN}?display=no`,
      );

      this.setState({
        unusedApiList: await unusedApiList.data.data,
      });
    },
    getApiDetail: async id => {
      this.setState({
        isApiDetailLoading: true,
      });

      const apiDetail = await axios.get(`${this.state.API_DOMAIN}/${id}`);

      this.setState({
        apiDetail: apiDetail.data.data,
        isApiDetailLoading: false,
      });
    },
    getMockApiList: async useFlag => {
      return await axios.get(`/admin-dashboard/management?display=${useFlag}`);
    },
    saveAvailableApi: async addApiInfo => {
      await axios.put('/admin-dashboard/management', {
        ...addApiInfo,
        isUsedApi: 'T',
      });

      await Promise.all([
        this.actions.getApiList(),
        this.actions.getMyApiList(),
        this.actions.getUnusedApiList(),
      ]);
    },
    updateAdditionalDescription: async updatedApi => {
      await axios.put(`${this.state.API_DOMAIN}`, updatedApi);
    },
    deleteMyApi: async api => {
      api.isUsedApi = 'F';
      await axios.put(`${this.state.API_DOMAIN}`, api);

      await Promise.all([
        this.actions.getApiList(),
        this.actions.getMyApiList(),
        this.actions.getUnusedApiList(),
      ]);
    },
    sortApiList: () => {
      if (this.state.isAscending) {
        this.setState({
          isAscending: !this.state.isAscending,
          apiList: this.state.apiList.sort(function(a, b) {
            return a.isUsedApi > b.isUsedApi
              ? -1
              : a.isUsedApi < b.isUsedApi
                ? 1
                : 0;
          }),
        });
      } else {
        this.setState({
          isAscending: !this.state.isAscending,
          apiList: this.state.apiList.sort(function(a, b) {
            return a.isUsedApi < b.isUsedApi
              ? -1
              : a.isUsedApi > b.isUsedApi
                ? 1
                : 0;
          }),
        });
      }
    },
  };

  render() {
    const { state, actions } = this;

    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

const apiContext = Component => {
  return props => {
    return (
      <ApiConsumer>
        {value => {
          return <Component {...props} value={value} />;
        }}
      </ApiConsumer>
    );
  };
};

export { ApiProvider, ApiConsumer, apiContext };
