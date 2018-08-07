import React from 'react';
import GlobalModalInput from '../global/GlobalModalInput';
import GlobalSelectBar from '../global/GlobalSelectBar';
import { dashboardContext } from '../../store/DashboardStore';

class DashboardModalEditDashboard extends React.Component {
  state = {
    selectedApi: 'Api를 선택하세요.',
    dashboardName: '',
    dashboardDescription: '',
    useApiList: [],
  };

  getDashboardData = dashboardData => {
    const { dashboardName, dashboardDescription } = dashboardData;

    this.setState({
      dashboardName: dashboardName,
      dashboardDescription: dashboardDescription,
    });
  };

  async componentDidMount() {
    const { value, dashboardData } = this.props;
    const { actions, state } = value;

    await actions.getMockApiList('use');
    await this.setState({
      useApiList: state.apiList,
    });

    if (dashboardData !== undefined) {
      this.getDashboardData(dashboardData);
      actions.setStateDashboardInfoByOriginData(dashboardData);
    }
  }

  handleInputChange = async ({ target }) => {
    const { name, type, checked, value } = target;
    const inputData = type === 'checkbox' ? checked : value;

    if (inputData.length >= 20) {
      alert('너무 길어.');
    } else {
      await this.changeStoreData(name, inputData);
    }

    this.setState({
      [name]: value,
    });
  };

  handleSelectChange = async ({ target }) => {
    const { innerText, id } = target;

    await this.setState({
      selectedApi: innerText,
    });

    await this.changeStoreData('apiId', id);
  };

  changeStoreData = async (key, value) => {
    const { actions } = this.props.value;
    await actions.setStateDashboardInfo(key, value);
  };

  render() {
    const { dashboardData } = this.props;
    const {
      dashboardName,
      dashboardDescription,
      useApiList,
      selectedApi,
    } = this.state;

    return dashboardData === undefined ? (
      <div>
        <GlobalModalInput
          inputTitle="Dashboard Name"
          inputPlaceholder={'사용할 Dashboard 이름을 입력하세요.'}
          name="dashboardName"
          handleInputChange={this.handleInputChange}
          value={dashboardName}
        />
        <GlobalModalInput
          inputTitle="Dashboard Description"
          inputPlaceholder={'대시보드의 간단한 설명을 작성해주세요.'}
          name="dashboardDescription"
          handleInputChange={this.handleInputChange}
          value={dashboardDescription}
        />
        <GlobalSelectBar
          title="Available API Lists"
          listTitle="API Lists"
          dataList={useApiList}
          handleSelectChange={this.handleSelectChange}
          selectedData={selectedApi}
        />
      </div>
    ) : (
      <div>
        <GlobalModalInput
          inputTitle="Dashboard Name"
          value={dashboardName}
          name="dashboardName"
          handleInputChange={this.handleInputChange}
        />
        <GlobalModalInput
          inputTitle="Dashboard Description"
          value={dashboardDescription}
          name="dashboardDescription"
          handleInputChange={this.handleInputChange}
        />
        <div className="p-2">
          <div className="text-muted font-weight-bold font-size w-100">
            Used API
            <div className="font-size w-100">{dashboardData.apiId}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default dashboardContext(DashboardModalEditDashboard);
