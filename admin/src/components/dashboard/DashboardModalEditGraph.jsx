import React from 'react';
import GlobalSelectBar from '../global/GlobalSelectBar';
import DashboardModalSelectCategory from './DashboardModalSelectCategory';
import DashboardModalGraphLists from './DashboardModalGraphLists';
import { WettyConsumer } from '../../Store';

export default class DashboardModalEditGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: {},
      selectBaseType: 'Base Type을 선택하세요.',
      selectDataType: 'Data Type을 선택하세요.',
      selectGraphType: 'Graph Type을 선택하세요',
    };
  }

  handleBaseTypeSelector = ({ target }) => {
    const { innerText } = target;

    this.setState({
      inputValue: { ...this.state.inputValue, baseType: innerText },
      selectBaseType: innerText,
    });
  };

  handleDataTypeSelector = ({ target }) => {
    const { innerText } = target;

    this.setState({
      inputValue: { ...this.state.inputValue, dataType: innerText },
      selectDataType: innerText,
    });
  };

  handleGraphTypeSelector = ({ target }) => {
    const { innerText } = target;

    this.setState({
      inputValue: { ...this.state.inputValue, graphType: innerText },
      selectGraphType: innerText,
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
                handleSelectChange={this.handleBaseTypeSelector}
                selectedData={this.state.selectBaseType}
              />
              <DashboardModalSelectCategory />
              <GlobalSelectBar
                title="Select Data - data type"
                listTitle="Data type"
                dataList={value.state.adminApiList}
                handleSelectChange={this.handleDataTypeSelector}
                selectedData={this.state.selectDataType}
              />
              <GlobalSelectBar
                title="Graph Type"
                listTitle="Available Graph types"
                dataList={value.state.graphTypeList}
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
