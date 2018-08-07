import React, { Component, createContext } from 'react';
import axios from 'axios';

const Store = createContext();
const { Provider, Consumer: DashboardConsumer } = Store;

class DashboardProvider extends Component {
  state = {
    API_DOMAIN: '/dashboard/management',
    dashboardList: [],
    apiList: [],
    dashboardInfo: {},
    isLoading: false,
    usingApiId: '',
    baseTypeList: [],
    graphInfo: {},
    dataTypeList: [],
    graphTypeList: [],
    categories: [],
    graphLists: [],
    addedGraphLists: [],
    dashboardId: '',
  };

  actions = {
    setStateDashboardInfoByOriginData: originData => {
      this.setState({
        dashboardInfo: originData,
        usingApiId: originData.apiId,
      });
    },

    setStateDashboardInfo: async (key, value) => {
      this.setState({
        dashboardInfo: { ...this.state.dashboardInfo, [key]: value },
      });
    },

    setStateGraphInfo: async (key, value) => {
      this.setState({
        graphInfo: { ...this.state.graphInfo, [key]: value },
      });
    },

    setStateGraphInfoBaseType: async value => {
      const { graphInfo } = this.state;
      this.setState({
        graphInfo: {
          ...graphInfo,
          baseType: {
            ...graphInfo.baseType,
            categories: value,
          },
        },
      });
    },

    getDashboardList: async () => {
      this.setState({
        isLoading: true,
      });

      const dashboardList = await axios.get('proxy/dashboard');

      await this.setState({
        dashboardList: dashboardList.data.data,
        isLoading: false,
      });
    },

    getMockApiList: async useFlag => {
      const apiList = await axios.get(
        `/admin-dashboard/management?display=${useFlag}`,
      );
      await this.setState({
        apiList: apiList.data.data,
      });
    },

    getBaseTypeListByApiId: async apiId => {
      const baseTypeList = await axios.get(
        `/dashboard/management/graph/axis?type=&apiId=${apiId}`,
      );

      await this.setState({
        baseTypeList: baseTypeList.data.data,
      });
    },

    getDataTypeListByBaseTypeAndApiId: async (apiId, baseType) => {
      try {
        const dataTypeList = await axios.get(
          `/dashboard/management/graph/axis?type=${baseType}&apiId=${apiId}`,
        );

        await this.setState({
          dataTypeList: dataTypeList.data.data,
        });
      } catch (e) {
        alert(e);
      }
    },

    getGraphTypeListByBaseTypeAndDataType: async (baseType, dataType) => {
      try {
        const graphTypeList = (await axios.get(
          `/dashboard/management/graph/type?baseType=${baseType}&dataType=${dataType}`,
        )).data.data;

        let subGraphTypeList = [];

        graphTypeList.forEach(data => {
          data.categories.forEach(graph => {
            subGraphTypeList.push(graph);
          });
        });

        await this.setState({
          graphTypeList: subGraphTypeList,
        });
      } catch (e) {
        alert(e);
      }
    },

    getGraphListsByDashboardId: async dashboardId => {
      try {
        const graphCollectionList = (await axios.get(
          `/proxy/dashboard/${dashboardId}`,
        )).data.data.graphCollectionList;

        this.setState({
          dashboardId,
          graphLists: graphCollectionList,
        });
      } catch (e) {
        alert(e);
      }
    },

    getCategories: baseType => {
      let categories;

      this.state.baseTypeList.forEach(data => {
        if (data.code === baseType) {
          categories = data.categories;
        }
      });

      this.setState({
        categories,
      });
    },

    deleteDashboard: async id => {
      try {
        alert(await axios.delete(`${this.state.API_DOMAIN}/${id}`));
        this.actions.getDashboardList();
      } catch (e) {
        alert(e);
      }
    },

    deleteGraph: index => {
      this.state.graphLists.splice(index, 1);

      this.setState({
        graphLists: [...this.state.graphLists],
      });
    },

    deleteGraphByGraphId: async graphId => {
      if (window.confirm('그래프를 삭제하시겠습니까?')) {
        try {
          alert(await axios.delete(`/dashboard/management/graph/${graphId}`));
          this.actions.getGraphListsByDashboardId(this.state.dashboardId);
        } catch (e) {
          alert(e);
        }
      }
    },

    createDashboard: async () => {
      const { dashboardInfo, API_DOMAIN, graphInfo } = this.state;
      const { dashboardName, dashboardDescription, apiId } = dashboardInfo;

      if (
        dashboardName === undefined ||
        dashboardDescription === undefined ||
        apiId === undefined
      ) {
        return false;
      } else {
        try {
          const dashboardId = (await axios.post(`${API_DOMAIN}`, dashboardInfo))
            .data.data.dashboardId;

          this.setState({
            usingApiId: apiId,
            dashboardId,
            graphInfo: {
              ...graphInfo,
              apiId: parseInt(apiId, 10),
              dashboardId: parseInt(dashboardId, 10),
            },
          });

          // this.actions.getDashboardList();
          return true;
        } catch (e) {
          alert(e);
        }
      }
    },

    completeAddingDashboard: async () => {
      const { graphLists, API_DOMAIN, dashboardId } = this.state;
      if (graphLists.length === 0) {
        if (
          window.confirm(
            '추가된 그래프가 없습니다. 그래프를 추가하지 않고 종료하면 대시보드도 삭제됩니다. 계속 하시겠습니까?',
          )
        ) {
          await axios.delete(`${API_DOMAIN}/${dashboardId}`);
          this.getDashboardList();
        }
      } else {
        const tempGraphLists = graphLists;
        const removeIdx = [];
        tempGraphLists.forEach((data, i) => {
          if (data.dataType === undefined) {
            removeIdx.push(i);
          }
        });

        removeIdx.forEach(idx => {
          tempGraphLists.splice(idx, 1);
        });

        try {
          if (removeIdx === []) {
            alert(await axios.put('/dashboard/management/graph', graphLists));
          } else {
            alert(await axios.post('/dashboard/management/graph', graphLists));
          }

          await this.setState({
            dashboardInfo: {},
            graphInfo: {},
            graphLists: [],
          });

          this.actions.getDashboardList();
        } catch (e) {
          alert(e);
        }
      }
    },

    createGraph: () => {
      const { graphLists, graphInfo, usingApiId, dashboardId } = this.state;
      const { graphName, graphType, baseType, dataType } = this.state.graphInfo;

      if (
        graphName === undefined ||
        graphType === undefined ||
        dataType === undefined ||
        baseType.code === undefined
      ) {
        alert('모든 값을 채워주세요.');
        return false;
      } else {
        if (this.checkCategoryValue(baseType.categories)) {
          this.setState({
            graphLists: [...graphLists, graphInfo],
            categories: [],
            dataTypeList: [],
            graphTypeList: [],
            graphInfo: {
              apiId: usingApiId,
              dashboardId,
            },
          });
          return true;
        } else {
          alert('category를 선택해주세요.');
          return false;
        }
      }
    },

    editDashboard: async () => {
      const { dashboardInfo, API_DOMAIN, graphInfo } = this.state;
      const {
        dashboardName,
        dashboardDescription,
        dashboardId,
      } = dashboardInfo;

      if (dashboardName === '' || dashboardDescription === '') {
        return false;
      } else {
        const usingApiId = dashboardInfo.apiId;

        await delete dashboardInfo.graphCollectionList;
        await delete dashboardInfo.apiId;

        try {
          const data = await axios.put(`${API_DOMAIN}`, dashboardInfo);

          await this.setState({
            dashboardId,
            graphInfo: {
              ...graphInfo,
              apiId: parseInt(usingApiId, 10),
              dashboardId: parseInt(dashboardId, 10),
            },
          });

          alert(data);
          return true;
        } catch (e) {
          alert(e);
        }
      }
    },
  };

  checkCategoryValue(categories) {
    let checkedNum = 0;

    if (categories[0].categoryKey === 'START_DATE') {
      categories.forEach(category => {
        if (category.categoryValue !== 'false') checkedNum++;
      });
      if (checkedNum === 3) return true;
    } else {
      categories.forEach(category => {
        if (category.categoryValue === 'true') checkedNum++;
      });

      if (checkedNum === 0) return false;
      else return true;
    }
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

const dashboardContext = Component => {
  return props => {
    return (
      <DashboardConsumer>
        {value => {
          return <Component {...props} value={value} />;
        }}
      </DashboardConsumer>
    );
  };
};

export { DashboardProvider, DashboardConsumer, dashboardContext };
