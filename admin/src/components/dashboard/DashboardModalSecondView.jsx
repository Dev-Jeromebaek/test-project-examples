import React from 'react';
import GlobalSelectBar from '../global/GlobalSelectBar';
import DashboardModalSelectCategory from './DashboardModalSelectCategory';
import DashboardModalGraphLists from './DashboardModalGraphLists';
import { WettyConsumer } from '../../Store';

export default class DashboardModalSecondView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: {},
      selectBaseType: 'Base Type을 선택하세요.',
      selectDataType: 'Data Type을 선택하세요.',
      selectGraphType: 'Graph Type을 선택하세요',
    };
    this.handleBaseTypeSelector = this.handleBaseTypeSelector.bind(this);
    this.handleDataTypeSelector = this.handleDataTypeSelector.bind(this);
    this.handleGraphTypeSelector = this.handleGraphTypeSelector.bind(this);
  }

  handleBaseTypeSelector(event) {
    const target = event.target;
    const value = target.innerText;

    this.setState({
      inputValue: { ...this.state.inputValue, baseType: value },
      selectBaseType: value,
    });
  }

  handleDataTypeSelector(event) {
    const target = event.target;
    const value = target.innerText;

    this.setState({
      inputValue: { ...this.state.inputValue, dataType: value },
      selectDataType: value,
    });
  }
  handleGraphTypeSelector(event) {
    const target = event.target;
    const value = target.innerText;

    this.setState({
      inputValue: { ...this.state.inputValue, graphType: value },
      selectGraphType: value,
    });
  }

  render() {
    return (
      <WettyConsumer>
        {value => {
          return (
            <div>
              <DashboardModalGraphLists />
              <GlobalSelectBar
                title="Select Data - base type"
                listTitle="Base type"
                apiList={value.state.adminApiList}
                handleSelectChange={this.handleBaseTypeSelector}
                selectedData={this.state.selectBaseType}
              />
              <DashboardModalSelectCategory />
              <GlobalSelectBar
                title="Select Data - data type"
                listTitle="Data type"
                apiList={value.state.adminApiList}
                handleSelectChange={this.handleDataTypeSelector}
                selectedData={this.state.selectDataType}
              />
              <GlobalSelectBar
                title="Graph Type"
                listTitle="Available Graph types"
                apiList={value.state.adminApiList}
                handleSelectChange={this.handleGraphTypeSelector}
                selectedData={this.state.selectGraphType}
              />
            </div>
          );
        }}
      </WettyConsumer>
    );
  }
}
