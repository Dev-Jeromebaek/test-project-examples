import React, { Component } from 'react';
import moment from 'moment';

import { DatePicker } from './components/DatePicker';
import { Select } from './components/Select';
import { Table } from './components/Table';
import {
  BiaxialLineChart,
  HighlightAndZoomLineChart,
  LineChartWithXAxisPading,
  TinyLineChart,
  ResponsiveChart,
} from './components/ReCharts';
import { PageHeader } from './components/PageHeader';
import { Tag, Empty } from 'antd';
import { Progress } from './components/Progress';

const { Option } = Select;

class App extends Component {
  // state = {
  //   startValue: null,
  //   endValue: null,
  //   open: false,
  // };

  // disabledStartDate = (startValue) => {
  //   const endValue = this.state.endValue;
  //   if (!startValue || !endValue) {
  //     return false;
  //   }
  //   return startValue.valueOf() > endValue.valueOf();
  // };

  // disabledEndDate = (endValue) => {
  //   const startValue = this.state.startValue;
  //   if (!endValue || !startValue) {
  //     return false;
  //   }
  //   return endValue.valueOf() <= startValue.valueOf();
  // };

  // onChange = (date, dateString) => {
  //   console.log(date);
  //   console.log(dateString);
  // };

  // onOk = (dates) => {
  //   console.log(dates);
  // };

  // onStartChange = (value) => {
  //   this.onChange('startValue', value);
  // };

  // onEndChange = (value) => {
  //   this.onChange('endValue', value);
  // };

  // handleStartOpenChange = (open) => {
  //   if (!open) {
  //     this.setState({ endOpen: true });
  //   }
  // };

  // handleEndOpenChange = (open) => {
  //   this.setState({ endOpen: open });
  // };

  handleSelectChange = (value) => {
    console.log(value);
  };

  render() {
    // const dateFormat = 'MM/DD/YYYY';
    // const { startValue, endValue, endOpen } = this.state;
    const list = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];
    return (
      <>
        <PageHeader
          title="App Test"
          tags={[{ id: 0, text: 'Warning', color: 'volcano' }, { id: 1, text: 'Test', color: 'red' }]}
        />
        {/* <div>
          <DatePicker size="large" value={moment()} onChange={this.onChange} />
          <DatePicker.RangePicker
            size="large"
            placeholder={['Start Date', 'End Date']}
            ranges={{
              'This Month': [moment().startOf('month'), moment().endOf('month')],
              'Last 30 Days': [moment().subtract(29, 'days'), moment()],
              'Last 3 Weeks': [moment().subtract(20, 'days'), moment()],
              'Last 2 Weeks': [moment().subtract(13, 'days'), moment()],
              'Last 1 Weekend': [moment().subtract(6, 'days'), moment()],
              'Last 3 Days': [moment().subtract(2, 'days'), moment()],
              Today: [moment(), moment()],
            }}
            value={[moment().subtract(13, 'days'), moment()]}
            onChange={this.onChange}
          />
        </div> */}
        <div>
          {/* <Select defaultValue={1} size="large" list={list} onChange={this.handleSelectChange} /> */}
          {/* <Select defaultValue={1} size="large" onChange={this.handleSelectChange}>
            <Option value={1}>1111</Option>
            <Option value={2}>2222</Option>
            <Option value={3}>3333</Option>
            <Option value={4}>4444</Option>
            <Option value={5}>5555</Option>
          </Select> */}
          {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
          {/* <Tag color={null}>aaaaaaa</Tag>
          <Tag.CheckableTag color={null} checked={true}>
            aaaaaaa
          </Tag.CheckableTag>
          <Tag.CheckableTag color={null} checked={false}>
            aaaaaaa
          </Tag.CheckableTag>
          <Progress percent={50} status="active" showInfo={true} format={(percent) => `${percent} !!!`} tooltip />
          <Progress percent={100} showInfo={false} /> */}
        </div>
        <div>
          <Table />
        </div>
        <div>
          <p>BiaxialLineChart</p>
          <BiaxialLineChart />
        </div>
        <div>
          <p>HighlightAndZoomLineChart</p>
          <HighlightAndZoomLineChart />
        </div>
        <div>
          <p>LineChartWithXAxisPading</p>
          <LineChartWithXAxisPading />
        </div>
        <div>
          <p>TinyLineChart</p>
          <TinyLineChart />
        </div>
        <div>
          <p>ResponsiveChart</p>
          <ResponsiveChart />
        </div>
      </>
    );
  }
}

export default App;
