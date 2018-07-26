import React from 'react';
import GlobalSelectBar from '../global/GlobalSelectBar';
import DashboardModalSelectCategory from './DashboardModalSelectCategory';
import DashboardModalGraphLists from './DashboardModalGraphLists';
import { WettyConsumer } from '../../Store';

export default class DashboardModalEditGraph extends React.Component {
  state = {
    inputValue: {},
    baseType: 'Base Type을 선택하세요.',
    dataType: 'Data Type을 선택하세요.',
    graphType: 'Graph Type을 선택하세요',
  };

  handleTypeSelector = ({ target }) => {
    const { innerText, name } = target;

    this.setState({
      inputValue: { ...this.state.inputValue, [name]: innerText },
      [name]: innerText,
    });
  };

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
                dataList={value.state.adminApiList}
                handleSelectChange={this.handleTypeSelector}
                selectedData={this.state.baseType}
                name="baseType"
              />
              <DashboardModalSelectCategory />
              <GlobalSelectBar
                title="Select Data - data type"
                listTitle="Data type"
                dataList={value.state.adminApiList}
                handleSelectChange={this.handleTypeSelector}
                selectedData={this.state.dataType}
                name="dataType"
              />
              <GlobalSelectBar
                title="Graph Type"
                listTitle="Available Graph types"
                dataList={value.state.graphTypeList}
                handleSelectChange={this.handleTypeSelector}
                selectedData={this.state.graphType}
                name="graphType"
              />
            </div>
          );
        }}
      </WettyConsumer>
    );
  }
}
