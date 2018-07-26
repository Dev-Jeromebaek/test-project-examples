import React from 'react';
import GlobalModalInput from '../global/GlobalModalInput';
import GlobalSelectBar from '../global/GlobalSelectBar';
import { WettyConsumer } from '../../Store';

export default class DashboardModalEditDashboard extends React.Component {
  state = {
    selectedApi: 'Api를 선택하세요.',
    inputValue: {},
  };

  handleInputChange = ({ target }) => {
    const { name, type, checked, value } = target;
    const inputData = type === 'checkbox' ? checked : value;

    if (inputData.length > 40) {
      alert('너무 길어.');
    } else {
      this.setState({
        inputValue: { ...this.state.inputValue, [name]: inputData },
      });
    }
  };

  handleSelectChange = ({ target }) => {
    const { innerText } = target;

    this.setState({
      inputValue: { ...this.state.inputValue, selectApi: innerText },
      selectedApi: innerText,
    });
  };

  render() {
    return (
      <WettyConsumer>
        {value => {
          return (
            <div>
              <GlobalModalInput
                inputTitle="Dashboard Name"
                inputPlaceholder="사용할 Dashboard 이름을 입력하세요."
                name="dashboardName"
                handleInputChange={this.handleInputChange}
              />
              <GlobalModalInput
                inputTitle="Dashboard Description"
                inputPlaceholder="Dashboard의 간단한 설명을 작성해주세요."
                name="dashboardDesc"
                handleInputChange={this.handleInputChange}
              />
              <GlobalSelectBar
                title="Available API Lists"
                listTitle="API Lists"
                dataList={value.state.adminApiList}
                handleSelectChange={this.handleSelectChange}
                selectedData={this.state.selectedApi}
              />
            </div>
          );
        }}
      </WettyConsumer>
    );
  }
}
