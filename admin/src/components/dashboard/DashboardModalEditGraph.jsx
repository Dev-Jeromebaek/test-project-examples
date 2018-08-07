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
    console.log(this.props.value.state.graphInfo);
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
    const { actions } = this.props.value;

    let tempCategories = categories;

    await tempCategories.forEach(data => {
      if (data.categoryKey === dataset.code) {
        if (dataset.code === 'SPLIT_TIME') data.categoryValue = value;
        else data.categoryValue = `${value} 00:00:00`;
      }
    });

    await this.setState({
      categories: tempCategories,
    });

    await actions.setStateGraphInfoBaseType(categories);
  };

  handleCheckbox = async ({ target }) => {
    const { dataset } = target;
    const { categories } = this.state;
    const { actions } = this.props.value;

    let tempCategories = categories;

    await tempCategories.forEach(data => {
      if (data.categoryKey === dataset.code) {
        if (data.categoryValue === 'false') {
          data.categoryValue = 'true';
        } else data.categoryValue = 'false';
      }
    });

    await this.setState({
      categories: tempCategories,
    });

    await actions.setStateGraphInfoBaseType(categories);
  };

  handleBaseTypeSelector = async ({ target }) => {
    const { innerText, name, dataset } = target;

    await this.setState({
      [name]: innerText,
    });

    await this.changeStoreData(name, { code: dataset.code, categories: [] });

    const { usingApiId, dataTypeList, categories } = this.props.value.state;
    const { baseType: code } = this.props.value.state.graphInfo;
    const { actions } = this.props.value;

    await actions.getDataTypeListByBaseTypeAndApiId(usingApiId, code.code);
    await actions.getCategories(code.code);
    await this.setState({
      dataTypeList: dataTypeList,
      categories: await this.makeCategoryDataSet(categories),
    });
  };

  makeCategoryDataSet = receivedData => {
    let makeData = [];

    receivedData.forEach(data => {
      makeData.push({ categoryKey: data.code, categoryValue: 'false' });
    });

    return makeData;
  };

  handleTypeSelector = async ({ target }) => {
    const { innerText, name, dataset } = target;
    const { actions } = this.props.value;
    const { graphInfo, graphTypeList } = this.props.value.state;
    const { baseType, dataType } = graphInfo;

    await this.setState({
      [name]: innerText,
    });
    await this.changeStoreData(name, dataset.code);

    if (name === 'dataType') {
      await actions.getGraphTypeListByBaseTypeAndDataType(
        baseType.code,
        dataType,
      );

      await this.setState({
        graphTypeList,
      });
    }
  };

  changeStoreData = async (key, value) => {
    if (key === undefined || value === undefined) {
      alert('잘못 선택하셨습니다.');
      return;
    }

    await this.props.value.actions.setStateGraphInfo(key, value);
  };

  componentDidMount() {
    const { dashboardId, value } = this.props;
    const { actions, state } = value;
    const { usingApiId, baseTypeList } = state;
    const apiId = usingApiId;

    actions.getBaseTypeListByApiId(apiId);
    this.setState({
      baseTypeList: baseTypeList,
    });

    if (dashboardId !== undefined) {
      actions.getGraphListsByDashboardId(dashboardId);
    }
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
    const { value, baseType, dataType, graphType } = this.state;
    const { dashboardId } = this.props;
    const {
      graphLists,
      baseTypeList,
      categories,
      dataTypeList,
      graphTypeList,
    } = this.props.value.state;
    return dashboardId !== undefined ? (
      /**
       * 수정할때
       */
      <div>
        <DashboardModalGraphLists
          dataList={graphLists}
          handleInputChange={this.handleInputChange}
          clearPlaceholder={this.initState}
          value={value}
        />
        <GlobalSelectBar
          title="Select Data - base type"
          listTitle="Base type"
          dataList={baseTypeList}
          handleSelectChange={this.handleBaseTypeSelector}
          selectedData={baseType}
          name="baseType"
        />
        {baseType !== 'Base Type을 선택하세요.' ? (
          <div>
            {baseType !== '날짜' ? (
              <DashboardModalSelectCategory
                handleCheckbox={this.handleCheckbox}
                dataList={categories}
                handleInput={this.handleDateInput}
              />
            ) : (
              this.renderDateInput(categories)
            )}
            <GlobalSelectBar
              title="Select Data - data type"
              listTitle="Data type"
              dataList={dataTypeList}
              handleSelectChange={this.handleTypeSelector}
              selectedData={dataType}
              name="dataType"
            />
          </div>
        ) : (
          ''
        )}
        <GlobalSelectBar
          title="Graph Type"
          listTitle="Available Graph types"
          dataList={graphTypeList}
          handleSelectChange={this.handleTypeSelector}
          selectedData={graphType}
          name="graphType"
        />
      </div>
    ) : (
      /**
       * 신규생성할때
       */
      <div>
        <DashboardModalGraphLists
          dataList={graphLists}
          handleInputChange={this.handleInputChange}
          clearPlaceholder={this.initState}
          value={value}
        />
        <GlobalSelectBar
          title="Select Data - base type"
          listTitle="Base type"
          dataList={baseTypeList}
          handleSelectChange={this.handleBaseTypeSelector}
          selectedData={baseType}
          name="baseType"
        />
        {this.state.baseType !== 'Base Type을 선택하세요.' ? (
          <div>
            {this.state.baseType !== '날짜' ? (
              <DashboardModalSelectCategory
                handleCheckbox={this.handleCheckbox}
                dataList={categories}
                handleInput={this.handleDateInput}
              />
            ) : (
              this.renderDateInput(categories)
            )}
            <GlobalSelectBar
              title="Select Data - data type"
              listTitle="Data type"
              dataList={dataTypeList}
              handleSelectChange={this.handleTypeSelector}
              selectedData={dataType}
              name="dataType"
            />
          </div>
        ) : (
          ''
        )}
        <GlobalSelectBar
          title="Graph Type"
          listTitle="Available Graph types"
          dataList={graphTypeList}
          handleSelectChange={this.handleTypeSelector}
          selectedData={graphType}
          name="graphType"
        />
      </div>
    );
  }
}

export default dashboardContext(DashboardModalEditGraph);
