import React, { Component, createContext } from 'react';
import axios from 'axios';
const Store = createContext();
const { Provider, Consumer: WettyConsumer } = Store;

class WettyProvider extends Component {
  state = {
    adminDashboardList: [],
    adminDetail: {},
    createCard: this.createCard,
    readCard: this.readCard,
    updateCard: this.updateCard,
    deleteCard: this.deleteCard,
    apiId: 18,
    adminApiList: [],
    useApiList: [],
  };

  actions = {
    createCard() {
      alert('Create card.');
    },
    readCard() {
      alert('Read card.');
    },
    updateCard(e) {
      e.stopPropagation();
      alert('Update card.');
    },
    deleteCard(e) {
      e.stopPropagation();
      alert('Delete card.');
    },
    async saveAvailableApi(addApi) {
      console.log(addApi);
      console.log('save');
      // axios patch (addApi)
    },
    deleteGraph() {
      alert('delete Graph');
    },
    createGraph() {
      alert('create Graph');
    },
    updateApi(api) {
      alert('Update API');
    },
    // 모달 오픈 이벤트
    handleApiModalOpen() {
      alert('Add Api Modal Open');
    },

    handleCreateApi(data) {
      const { useApiList } = this.state;

      this.setState({
        useApiList: useApiList.concat(
          Object.assign({}, data, {
            // apiId: this.apiId++,
          }),
        ),
      });
    },
    handleRemoveApi(id) {
      const { useApiList } = this.state;
      this.setState({
        useApiList: useApiList.filter(apiOne => apiOne.apiId !== id),
      });
    },
    handleUpdateApi(id, editData) {
      const { useApiList } = this.state;
      this.setState({
        useApiList: useApiList.map(apiOne => {
          if (apiOne.apiId === id) {
            return {
              id,
              ...editData,
            };
          }
          return apiOne;
        }),
      });
    },
  };

  async componentDidMount() {
    const dashboardList = await axios.get(
      'http://10.5.220.246:8080/dashboard_list',
    );
    const apiList = await axios.get('http://10.5.220.246:8080/api_list');
    const apiDetail = await axios.get('http://10.5.220.246:8080/api_detail');
    const error = await axios.get('http://10.5.220.246:8080/error');
    const graphTypeList = await axios.get(
      'http://10.5.220.246:8080/graph_type_list',
    );

    this.setState({
      adminDashboardList: dashboardList.data,
      adminApiList: apiList.data,
      apiDetail: apiDetail.data,
      graphTypeList: graphTypeList.data,
      error: error.data,
    });
  }

  render() {
    const { state, actions } = this;

    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { WettyProvider, WettyConsumer };
