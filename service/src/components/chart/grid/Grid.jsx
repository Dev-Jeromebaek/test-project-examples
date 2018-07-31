import React, { Component, Fragment } from 'react';

import graphData from '../data/getGraphData.json';
import DrawChart from '../draw/DrawChart';

class Grid extends Component {
  state = {
    gridSize: {},
  };
  tempArea = [];
  nextFillGrid = {
    x: 0,
    y: 0,
  };
  returnGrid = {
    w: 0,
    h: 1,
    x: 0,
    y: 0,
  };

  passOnGraphData = id => {
    return graphData.graph_data.filter(info => info.graphId === id);
  };

  setGridLayout = info => {
    const { collectionId, graphDetailType } = info;
    const { x, y } = this.nextFillGrid;

    if (graphDetailType === 'LINEAR_GRAPH') {
      // 2x1 크기일 경우
      this.returnGrid.w = 2;
      if (x === 3) {
        // 들어갈 공간 x, 채울 공간 x
        this.returnGrid.x = 0;
        this.returnGrid.y = y + 1;
        this.nextFillGrid.x = this.returnGrid.x + 2;
        this.nextFillGrid.y = this.returnGrid.y;
      } else if (x === 2) {
        // 들어갈 공간 x, 채울 공간 o
        this.tempArea.push({ x: this.nextFillGrid.x, y: this.nextFillGrid.y });
        this.returnGrid.x = 0;
        this.returnGrid.y = y + 1;
        this.nextFillGrid.x = this.returnGrid.x + 2;
        this.nextFillGrid.y = this.returnGrid.y;
      } else {
        // 들어갈 공간 o, 채울 공간 o
        this.returnGrid.x = x;
        this.nextFillGrid.x = this.returnGrid.x + 2;
      }
    } else {
      // 1x1 크기일 경우
      this.returnGrid.w = 1;
      if (this.tempArea.length === 0) {
        // 채울 공간이 없는 경우
        if (x === 3) {
          // x: 0, y: y+1
          this.returnGrid.x = 0;
          this.returnGrid.y = y + 1;
          this.nextFillGrid.x = this.returnGrid.x + 1;
          this.nextFillGrid.y = this.returnGrid.y;
        } else {
          // x: x+1, y: y
          this.returnGrid.x = x;
          this.returnGrid.y = y;
          this.nextFillGrid.x = this.returnGrid.x + 1;
        }
      } else {
        // 채울 공간이 있는 경우
        let area = this.tempArea.shift();
        this.returnGrid.x = area.x;
        this.returnGrid.y = area.y;
      }
    }
    // console.log('result fill grid');
    // console.log(this.nextFillGrid);
    // console.log('result return grid');
    console.log(this.returnGrid);
    return this.returnGrid;
  };

  createChartList = id => {
    // 1개의 dashboard에 포함된 graphCollection 정보(배열)
    const { graphCollection } = graphData.dashboard_list[id - 1];

    let chartList = [];
    graphCollection.map(ct_info => {
      chartList.push(
        <DrawChart
          graphInfo={this.passOnGraphData(ct_info.graphId)}
          layoutKey={ct_info.collectionId}
          dataGrid={this.setGridLayout(ct_info)}
          key={ct_info.collectionId}
        />,
      );
    });
    return chartList;
  };

  render() {
    return <Fragment>{this.createChartList(this.props.dashboardId)}</Fragment>;
  }
}

export default Grid;
