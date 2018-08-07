import React from 'react';
import DashboardModalAddedGraph from './DashboardModalAddedGraph';
import DashboardModalAddGraphInput from './DashboardModalAddGraphInput';

const DashboardModalGraphLists = ({
  dataList,
  handleInputChange,
  clearPlaceholder,
  value,
}) => {
  return (
    <div className="bg-light w-100 py-2">
      <div className="px-3">Graph Lists</div>
      {dataList.map((data, i) => {
        return (
          <DashboardModalAddedGraph
            graphName={data.graphName}
            index={i}
            key={i}
            graphId={data.graphId}
          />
        );
      })}
      <DashboardModalAddGraphInput
        handleInputChange={handleInputChange}
        clearPlaceholder={clearPlaceholder}
        value={value}
      />
    </div>
  );
};

export default DashboardModalGraphLists;
