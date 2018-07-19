import React from 'react';
import GlobalModalInput from '../global/GlobalModalInput';
import GlobalSelectBar from '../global/GlobalSelectBar';
import { WettyConsumer } from '../../Store';

export default class DashboardModalFirstView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedApi: 'Api를 선택하세요.',
      inputValue: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (value.length > 40) {
      alert('너무 길어.');
    } else {
      this.setState({
        inputValue: { ...this.state.inputValue, [name]: value },
      });
    }
  }

  handleSelectChange(event) {
    const target = event.target;
    const value = target.innerText;

    this.setState({
      inputValue: { ...this.state.inputValue, selectApi: value },
      selectedApi: value,
    });
  }

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
                apiList={value.state.adminApiList}
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
