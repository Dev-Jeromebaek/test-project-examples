import React from 'react';
import GlobalSelectBar from '../global/GlobalSelectBar';
import DashboardModalSelectCategory from './DashboardModalSelectCategory';
import DashboardModalGraphLists from './DashboardModalGraphLists';
import { dashboardContext } from '../../store/DashboardStore';
import DashboardDateInput from './DashboardDateInput';

class DashboardModalEditGraph extends React.Component {
  state = {
    baseType: 'Base Type을 선택하세요.',
    dataType: 'Data Type을 선택하세요.',
    graphType: 'Graph Type을 선택하세요',
    categories: [],
    value: '',
  };

  initState = () => {
    this.setState({
      baseType: 'Base Type을 선택하세요.',
      dataType: 'Data Type을 선택하세요.',
      graphType: 'Graph Type을 선택하세요',
      categories: [],
      value: '',
    });
  };

  handleInputChange = async ({ target }) => {
    const { name, type, checked, value } = target;
    const inputData = type === 'checkbox' ? checked : value;

    if (inputData.length >= 20) {
      alert('너무 길어.');
    } else {
      await this.changeStoreData(name, inputData);
    }

    this.setState({
      value,
    });
  };

  handleDateChange = async ({ target }) => {
    const { dataset, value } = target;
    const { categories } = this.state;

    let tempCategories = categories;

    await tempCategories.map(data => {
      if (data.categoryKey === dataset.code) {
        if (dataset.code === 'SPLIT_TIME') data.categoryValue = value;
        else data.categoryValue = `${value} 00:00:00`;
      }
    });

    await this.setState({
      categories: tempCategories,
    });

    await this.props.value.actions.setStateGraphInputInfoBaseType(
      this.state.categories,
    );
  };

  handleCheckbox = async ({ target }) => {
    const { dataset } = target;
    const { categories } = this.state;
    let tempCategories = categories;

    await tempCategories.map(data => {
      if (data.categoryKey === dataset.code) {
        if (data.categoryValue === 'false') {
          data.categoryValue = 'true';
        } else data.categoryValue = 'false';
      }
    });

    await this.setState({
      categories: tempCategories,
    });

    await this.props.value.actions.setStateGraphInputInfoBaseType(
      this.state.categories,
    );
  };

  handleBaseTypeSelector = async ({ target }) => {
    const { innerText, name, dataset } = target;

    await this.setState({
      [name]: innerText,
    });

    await this.changeStoreData(name, { code: dataset.code, categories: [] });

    const { usingApiId } = this.props.value.state;
    const { baseType: code } = this.props.value.state.graphInputInfo;

    await this.props.value.actions.getDataTypeListByBaseTypeAndApiId(
      usingApiId,
      code.code,
    );

    await this.props.value.actions.getCategories(code.code);

    await this.setState({
      dataTypeList: this.props.value.state.dataTypeList,
      categories: await this.makeCategoryDataSet(
        this.props.value.state.categories,
      ),
    });
  };

  makeCategoryDataSet = receivedData => {
    let makeData = [];

    receivedData.map(data => {
      makeData.push({ categoryKey: data.code, categoryValue: 'false' });
    });

    return makeData;
  };

  handleTypeSelector = async ({ target }) => {
    // console.log(this.props.value.state.graphInputInfo);

    const { innerText, name, dataset } = target;

    await this.setState({
      [name]: innerText,
    });

    await this.changeStoreData(name, dataset.code);

    if (name === 'dataType') {
      const { baseType } = this.props.value.state.graphInputInfo;
      const { dataType } = this.props.value.state.graphInputInfo;
      await this.props.value.actions.getGraphTypeListByBaseTypeAndDataType(
        baseType.code,
        dataType,
      );

      await this.setState({
        graphTypeList: this.props.value.state.graphTypeList,
      });
    }
  };

  changeStoreData = async (key, value) => {
    if (key === undefined || value === undefined) {
      alert('잘못 선택하셨습니다.');
      return;
    }

    await this.props.value.actions.setStateGraphInputInfo(key, value);
  };

  async componentDidMount() {
    const apiId = await this.props.value.state.usingApiId;

    await this.props.value.actions.getBaseTypeListByApiId(apiId);

    await this.setState({
      baseTypeList: await this.props.value.state.baseTypeList,
    });
  }

  renderDateInput(dataList) {
    if (dataList[0] === undefined) {
      return;
    } else {
      return (
        <div>
          <DashboardDateInput
            title={dataList[0].title}
            code={dataList[0].code}
            handleInputChange={this.handleDateChange}
          />
          <DashboardDateInput
            title={dataList[1].title}
            code={dataList[1].code}
            handleInputChange={this.handleDateChange}
          />
          <form className="px-2">
            <label className="text-muted font-weight-bold font-size">
              {dataList[2].title}
              <input
                type="number"
                className="input-description text-center"
                onChange={this.handleDateChange}
                autoComplete="off"
                data-code={dataList[2].code}
              />{' '}
              시간
            </label>
          </form>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <DashboardModalGraphLists
          dataList={this.props.value.state.graphLists}
          handleInputChange={this.handleInputChange}
          clearPlaceholder={this.initState}
          value={this.state.value}
        />
        <GlobalSelectBar
          title="Select Data - base type"
          listTitle="Base type"
          dataList={this.props.value.state.baseTypeList}
          handleSelectChange={this.handleBaseTypeSelector}
          selectedData={this.state.baseType}
          name="baseType"
        />
        {this.state.baseType !== 'Base Type을 선택하세요.' ? (
          <div>
            {this.state.baseType !== '날짜' ? (
              <DashboardModalSelectCategory
                handleCheckbox={this.handleCheckbox}
                dataList={this.props.value.state.categories}
                handleInput={this.handleDateInput}
              />
            ) : (
              this.renderDateInput(this.props.value.state.categories)
            )}
            <GlobalSelectBar
              title="Select Data - data type"
              listTitle="Data type"
              dataList={this.props.value.state.dataTypeList}
              handleSelectChange={this.handleTypeSelector}
              selectedData={this.state.dataType}
              name="dataType"
            />
          </div>
        ) : (
          ''
        )}
        <GlobalSelectBar
          title="Graph Type"
          listTitle="Available Graph types"
          dataList={this.props.value.state.graphTypeList}
          handleSelectChange={this.handleTypeSelector}
          selectedData={this.state.graphType}
          name="graphType"
        />
      </div>
    );
  }
}

export default dashboardContext(DashboardModalEditGraph);
