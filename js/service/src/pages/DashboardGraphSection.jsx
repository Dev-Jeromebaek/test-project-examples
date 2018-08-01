import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Button } from 'reactstrap';

import DrawChart from '../components/chart/draw/DrawChart';
import graphData from '../components/chart/data/getGraphData.json';
import { withContext } from '../Store';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class DashboardGraphSection extends React.PureComponent {
  originalLayouts =
    this.props.value.actions.getFromLocalStorage('userLayout') || {};

  state = {
    layouts: JSON.parse(JSON.stringify(this.originalLayouts)),
    dashboardList: [],
    isReSized: false,
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

  async componentDidMount() {
    const dashboardList = await this.props.value.getter.dashboardList();
    this.setState({
      dashboardList: dashboardList.data.data,
    });
  }

  initGrid = () => {
    this.tempArea = [];
    this.nextFillGrid = {
      x: 0,
      y: 0,
    };
    this.returnGrid = {
      w: 0,
      h: 1,
      x: 0,
      y: 0,
    };
  };

  passOnGraphData = id => {
    return graphData.graph_data.filter(info => info.graphId === id);
  };

  setGridLayout = info => {
    const { graphDetailType } = info;
    let { x, y } = this.nextFillGrid;
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
        this.tempArea.push({
          x: this.nextFillGrid.x,
          y: this.nextFillGrid.y,
        });
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
        const area = this.tempArea.shift();
        this.returnGrid.x = area.x;
        this.returnGrid.y = area.y;
      }
    }
    const returnValue = { ...this.returnGrid };
    return returnValue;
  };

  createChartList = id => {
    this.initGrid();
    // 1개의 dashboard에 포함된 graphCollection 정보(배열)
    const { graphCollection } = graphData.dashboard_list[id - 1];
    const chartList = graphCollection.map(ct_info => {
      return (
        <div
          className="bg-white"
          key={ct_info.collectionId}
          data-grid={this.setGridLayout(ct_info)}
        >
          <DrawChart
            graphInfo={this.passOnGraphData(ct_info.graphId)}
            key={ct_info.collectionId}
          />
        </div>
      );
    });
    return chartList;
  };

  resetLayout = () => {
    this.initGrid();
    this.setState({ layouts: {} });
  };

  onLayoutChange = (layout, layouts) => {
    this.initGrid();
    this.props.value.actions.saveToLocalStorage('userLayout', layouts);
    this.setState({ layouts });
  };

  render() {
    return (
      <div className="bg-light">
        <Button onClick={() => this.resetLayout()}>Reset Layout</Button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 3, md: 3, sm: 3, xs: 1, xxs: 1 }}
          rowHeight={420}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          {this.createChartList(this.props.dashboardId)}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default withContext(DashboardGraphSection);
