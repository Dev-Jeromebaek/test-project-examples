import React, { Component, createContext } from 'react';
import axios from 'axios';
const Store = createContext();
const { Provider, Consumer: WettyConsumer } = Store;

class WettyProvider extends Component {
  state = {
    adminDashboardList: [],
    apiDetail: {},
    createCard: this.createCard,
    readCard: this.readCard,
    updateCard: this.updateCard,
    deleteCard: this.deleteCard,
    apiId: 18,
    adminApiList: [],
    ApiLists: [
      {
        apiId: 1,
        httpMethod: 'GET',
        apiName: '방문 이력',
        requestUrl: '/api/mock-api',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 2,
        httpMethod: 'GET',
        apiName: '판매 이력',
        requestUrl: '/api/mock-api',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 3,
        httpMethod: 'GET',
        apiName: '문의 이력',
        requestUrl: '/api/mock-api',
        isUsedApi: false,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 4,
        httpMethod: 'GET',
        apiName: '방문 이력',
        requestUrl: '/api/mock-api-4',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 5,
        httpMethod: 'POST',
        apiName: '판매 이력',
        requestUrl: '/api/mock-api-5',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 6,
        httpMethod: 'GET',
        apiName: '문의 이력',
        requestUrl: '/api/mock-api-6',
        isUsedApi: false,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 7,
        httpMethod: 'GET',
        apiName: '방문 이력',
        requestUrl: '/api/mock-api-7',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 9,
        httpMethod: 'POST',
        apiName: '판매 이력',
        requestUrl: '/api/mock-api-9',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 10,
        httpMethod: 'GET',
        apiName: '방문 이력',
        requestUrl: '/api/mock-api-10',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 11,
        httpMethod: 'POST',
        apiName: '판매 이력',
        requestUrl: '/api/mock-api-11',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 12,
        httpMethod: 'GET',
        apiName: '방문 이력',
        requestUrl: '/api/mock-api-12',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 13,
        httpMethod: 'POST',
        apiName: '판매 이력',
        requestUrl: '/api/mock-api-13',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 14,
        httpMethod: 'GET',
        apiName: '방문 이력',
        requestUrl: '/api/mock-api-14',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 15,
        httpMethod: 'POST',
        apiName: '판매 이력',
        requestUrl: '/api/mock-api-15',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 16,
        httpMethod: 'GET',
        apiName: '방문 이력',
        requestUrl: '/api/mock-api-16',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
      {
        apiId: 17,
        httpMethod: 'POST',
        apiName: '판매 이력',
        requestUrl: '/api/mock-api-17',
        isUsedApi: true,
        description: '추가 설명 부분 작성 예정',
      },
    ],
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
  };
  handleApiModalOpen = () => {
    alert('Add Api Modal Open');
  };
  handleCreateApi = data => {
    // console.log(data);

    const { adminApiList } = this.state;

    this.setState({
      adminApiList: adminApiList.concat(
        Object.assign({}, data, {
          apiId: this.apiId++,
        }),
      ),
    });
  };

  handleRemoveApi = id => {
    // console.log(id);
    // console.log(this);
    const { adminApiList } = this.state;
    // console.log(ApiLists);
    this.setState({
      adminApiList: adminApiList.filter(apiOne => apiOne.apiId !== id),
    });
  };

  handleUpdateApi = (id, editData) => {
    const { adminApiList } = this.state;
    this.setState({
      adminApiList: adminApiList.map(apiOne => {
        if (apiOne.apiId === id) {
          return {
            id,
            ...editData,
          };
        }
        return apiOne;
      }),
    });
  };

  async componentDidMount() {
    const dashboardList = await axios.get(
      'http://10.5.220.246:8080/dashboard_list',
    );
    const apiList = await axios.get('http://10.5.220.246:8080/api_list');
    const apiDetail = await axios.get('http://10.5.220.246:8080/api_detail');
    const graphTypeList = await axios.get(
      'http://10.5.220.246:8080/graph_type_list',
    );

    this.setState({
      adminDashboardList: dashboardList.data,
      adminApiList: apiList.data,
      apiDetail: apiDetail.data,
      graphTypeList: graphTypeList.data,
    });
  }

  render() {
    const {
      state,
      actions,
      handleApiModalOpen,
      handleCreateApi,
      handleRemoveApi,
      handleUpdateApi,
    } = this;

    const value = {
      state,
      actions,
      handleApiModalOpen,
      handleCreateApi,
      handleRemoveApi,
      handleUpdateApi,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { WettyProvider, WettyConsumer };
