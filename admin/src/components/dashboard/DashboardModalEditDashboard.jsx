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

  async componentDidMount() {
    await this.props.value.actions.getMockApiList('use');
    await this.setState({
      useApiList: this.props.value.state.apiList,
    });
  }

  handleInputChange = async ({ target }) => {
    const { name, type, checked, value } = target;
    const inputData = type === 'checkbox' ? checked : value;

    if (inputData.length >= 20) {
      alert('너무 길어.');
    } else {
      await this.changeStoreData(name, inputData);
    }
  };

  handleSelectChange = async ({ target }) => {
    const { innerText, id } = target;

    await this.setState({
      selectedApi: innerText,
    });

    await this.changeStoreData('apiId', id);
  };

  changeStoreData = async (key, value) => {
    await this.props.value.actions.setStateDashboardInputInfo(key, value);
  };

  render() {
    const { dashboardData } = this.props;

    return dashboardData === undefined ? (
      <div>
        <GlobalModalInput
          inputTitle="Dashboard Name"
          inputPlaceholder={'사용할 Dashboard 이름을 입력하세요.'}
          name="dashboardName"
          handleInputChange={this.handleInputChange}
        />
        <GlobalModalInput
          inputTitle="Dashboard Description"
          inputPlaceholder={'대시보드의 간단한 설명을 작성해주세요.'}
          name="dashboardDescription"
          handleInputChange={this.handleInputChange}
        />
        <GlobalSelectBar
          title="Available API Lists"
          listTitle="API Lists"
          dataList={this.state.useApiList}
          handleSelectChange={this.handleSelectChange}
          selectedData={this.state.selectedApi}
        />
      </div>
    ) : (
      <div>
        <GlobalModalInput
          inputTitle="Dashboard Name"
          value={dashboardData.dashboardName}
          name="dashboardName"
          handleInputChange={this.handleInputChange}
        />
        <GlobalModalInput
          inputTitle="Dashboard Description"
          value={dashboardData.dashboardDescription}
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
