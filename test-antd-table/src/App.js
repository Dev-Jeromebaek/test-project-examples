import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Table, Divider, Tag } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Invite {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const BodyRow = ({ ...restProps }) => {
  const style = { ...restProps.style, cursor: 'move' };
  let className = restProps.className;
  console.log(restProps);

  return <tr {...restProps} className={className} style={style} draggable />;
};

function App() {
  const components = {
    body: {
      row: BodyRow,
    },
  };

  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        console.log(event.target, record, rowIndex);
      }, // click row
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
      onDragStart: (event) => {
        console.log('drag start');
        console.log(event.target, record, rowIndex);
      },
      onDragEnd: (event) => {
        console.log('drag end');
        console.log(event.target, record, rowIndex);
      },
    };
  };
  return <Table columns={columns} dataSource={data} components={components} onRow={onRow} />;
}

export default App;
