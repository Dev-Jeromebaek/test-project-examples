import React from 'react';
import DashboardModalAddedGraph from './DashboardModalAddedGraph';
import DashboardModalAddGraphInput from './DashboardModalAddGraphInput';

export default class DashboardModalGraphLists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bg-light w-100 py-2">
        <div className="px-3">Graph Lists</div>
        <DashboardModalAddedGraph graphName="추가된 그래프 1" />
        <DashboardModalAddGraphInput />
      </div>
    );
  }
}
