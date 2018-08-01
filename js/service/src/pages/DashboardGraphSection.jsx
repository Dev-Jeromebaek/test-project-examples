import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Button } from 'reactstrap';

import DrawChart from '../components/chart/draw/DrawChart';
import {
  setGridLayout,
  initGrid,
} from '../components/chart/variables/ChartLayoutSet';
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

  async componentDidMount() {
    const dashboardList = await this.props.value.getter.dashboardList();
    this.setState({
      dashboardList: dashboardList.data.data,
    });
  }

  passOnGraphData = id => {
    return graphData.graph_data.filter(info => info.graphId === id);
  };

  createChartList = id => {
    initGrid();
    // 1개의 dashboard에 포함된 graphCollection 정보(배열)
    const { graphCollection } = graphData.dashboard_list[id - 1];
    const chartList = graphCollection.map(ct_info => {
      return (
        <div
          className="bg-white"
          key={ct_info.collectionId}
          data-grid={setGridLayout(ct_info)}
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
    initGrid();
    this.setState({ layouts: {} });
  };

  onLayoutChange = (layout, layouts) => {
    initGrid();
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
