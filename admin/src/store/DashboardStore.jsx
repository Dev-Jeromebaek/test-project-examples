import React, { Component, createContext } from 'react';
import axios from 'axios';

const Store = createContext();
const { Provider, Consumer: DashboardConsumer } = Store;

class DashboardProvider extends Component {
  state = {
    API_DOMAIN: '/dashboard/management',
    dashboardList: [],
    apiList: [],
    dashboardInputInfo: {},
    isLoading: false,
    usingApiId: '',
    baseTypeList: [],
    graphInputInfo: {},
    dataTypeList: [],
    graphTypeList: [],
    categories: [],
    graphLists: [],
  };

  actions = {
    setStateDashboardInputInfo: async (key, value) => {
      this.setState({
        dashboardInputInfo: { ...this.state.dashboardInputInfo, [key]: value },
      });
    },

    setStateGraphInputInfo: async (key, value) => {
      this.setState({
        graphInputInfo: { ...this.state.graphInputInfo, [key]: value },
      });
    },

    setStateGraphInputInfoBaseType: async value => {
      this.setState({
        graphInputInfo: {
          ...this.state.graphInputInfo,
          baseType: {
            ...this.state.graphInputInfo.baseType,
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
        const graphTypeList = await axios.get(
          `/dashboard/management/graph/type?baseType=${baseType}&dataType=${dataType}`,
        );

        let subGraphTypeList = [];

        graphTypeList.data.data.map(data => {
          data.categories.map(graph => {
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

    getCategories: baseType => {
      let categories;

      this.state.baseTypeList.map(data => {
        if (data.code === baseType) {
          categories = data.categories;
        }
      });

      this.setState({
        categories,
      });
    },

    deleteDashboard: async id => {
        await axios.delete(`${this.state.API_DOMAIN}/${id}`);
        this.actions.getDashboardList();
    },

    deleteGraph: index => {
      this.state.graphLists.splice(index, 1);

      this.setState({
        graphLists: [...this.state.graphLists],
      });

      console.log(index);
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
          const data = await axios.post(`${this.state.API_DOMAIN}`, {
            ...this.state.dashboardInputInfo,
          });

          this.setState({
            usingApiId: apiId,
            dashboardId: data.data.data.dashboardId,
            graphInputInfo: {
              ...this.state.graphInputInfo,
              apiId: parseInt(apiId),
              dashboardId: parseInt(data.data.data.dashboardId),
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
      if (this.state.graphLists.length === 0) {
        if (
          window.confirm(
            '추가된 그래프가 없습니다. 그래프를 추가하지 않고 종료하면 대시보드도 삭제됩니다. 계속 하시겠습니까?',
          )
        ) {
          await axios.delete(
            `${this.state.API_DOMAIN}/${this.state.dashboardId}`,
          );
          this.getDashboardList();
        }
      } else {
        try {
          alert(
            await axios.post(
              '/dashboard/management/graph',
              this.state.graphLists,
            ),
          );

          await this.setState({
            dashboardInputInfo: {},
            graphInputInfo: {},
            graphLists: [],
          });

          // await alert('생성완료');
          this.actions.getDashboardList();
        } catch (e) {
          alert(e);
        }
      }
    },

    createGraph: () => {
      const {
        graphName,
        graphType,
        baseType,
        dataType,
      } = this.state.graphInputInfo;

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
            graphLists: [...this.state.graphLists, this.state.graphInputInfo],
            categories: [],
            dataTypeList: [],
            graphTypeList: [],
          });
          return true;
        } else {
          alert('category를 선택해주세요.');
          return false;
        }
      }
    },
  };

  checkCategoryValue(categories) {
    let checkedNum = 0;

    console.log(categories);
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
