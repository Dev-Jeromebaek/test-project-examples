import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Table.scss';

import { Table as AntdTable, Tag } from 'antd';
import { Progress } from '../Progress';

const propTypes = {};
const defaultProps = {};

const columns = [
  {
    title: 'Text',
    dataIndex: 'text',
    key: 'text',
    width: 250,
    render: (text) => <Tag color="volcano">{text}</Tag>,
    sorter: (a, b) => console.log(a.text, b.text),
  },
  {
    title: 'Campaign',
    dataIndex: 'campaign',
    key: 'campaign',
    width: 200,
    sorter: (a, b) => a.campaign - b.campaign,
  },
  {
    title: 'AdGroup',
    dataIndex: 'adGroup',
    key: 'adGroup',
    width: 200,
    sorter: (a, b) => console.log(a.adGroup, b.adGroup),
  },
  {
    title: 'Action',
    key: 'action',
    // width: 300,
    render: (text, record) => (
      // <Progress percent={100} status="active" showInfo={true} format={(percent) => `${percent} %`} tooltip />
      <Progress percent={84} showInfo={true} status="active" tooltip="true" />
    ),
  },
];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    text: 'ipsum',
    campaign: `${i}2`,
    adGroup: `ipsum. ${i} Lorem`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

class Table extends Component {
  state = {
    bordered: false,
    loading: false,
    pagination: { position: 'none' },
    size: 'middle',
    showHeader: true,
    rowSelection: {},
  };

  handleToggle = (prop) => (enable) => {
    this.setState({ [prop]: enable });
  };

  handleRowSelectionChange = (enable) => {
    this.setState({ rowSelection: enable ? {} : undefined });
  };

  handleOnRow = (record, index) => {
    // console.log(record, index);
  };

  render() {
    const state = this.state;
    return (
      <div>
        <AntdTable
          bordered={false}
          loading={false}
          // pagination={{ position: 'bottom', pageSize: 5, size: "" }}
          pagination={{ position: 'none' }}
          size="middle"
          showHeader
          columns={columns}
          dataSource={data}
          onRow={this.handleOnRow}
          rowSelection={rowSelection}
          scroll={{ y: 240 }}
        />
      </div>
    );
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
