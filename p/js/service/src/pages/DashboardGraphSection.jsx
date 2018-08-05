import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Button } from 'reactstrap';

import DrawChart from '../components/chart/draw/DrawChart';
import { withContext } from '../Store';
import {
  setGridLayout,
  initGrid,
} from '../components/chart/variables/ChartLayoutSet';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class DashboardGraphSection extends React.PureComponent {
  originalLayouts =
    this.props.value.actions.getFromLocalStorage('userLayout') || {};

  refreshBtnRef = React.createRef();

  state = {
    layouts: JSON.parse(JSON.stringify(this.originalLayouts)),
    dashboardId: 0,
    dashboardOne: [],
    isReSized: false,
    isLoadData: false,
  };

  async componentDidMount() {
    console.log(this.props.dashboardId);
    const dashboardOne = await this.props.value.actions.getDashboardOne(
      this.props.dashboardId,
    );
    this.setState({
      dashboardOne: dashboardOne.data,
      isLoadData: true,
    });
  }

  createChartList = id => {
    initGrid();
    console.log(id);
    // 1개의 dashboard에 포함된 graphCollectionList 정보(배열)
    if (this.state.dashboardOne.length !== 0 && this.state.isLoadData) {
      // console.log(dashboardOne);
      const { graphCollectionList } = this.state.dashboardOne.data;
      const { cycleTime, initialCycle, cycleTimmer, setCycleTime } = this.props;
      const chartList = graphCollectionList.map(ct_info => {
        return (
          <div
            className="bg-white"
            key={ct_info.collectionId}
            data-grid={setGridLayout(ct_info)}
          >
            <DrawChart
              dashboardId={id}
              graphId={ct_info.graphId}
              key={ct_info.collectionId}
              initialCycle={initialCycle}
              cycleTime={cycleTime}
              cycleTimmer={cycleTimmer}
              setCycleTime={setCycleTime}
              // refreshBtnRef={this.refreshBtnRef}
            />
          </div>
        );
      });
      return chartList;
    }
  };

  resetLayout = () => {
    initGrid();
    this.setState({ layouts: {} });
    this.props.initialCycle();
  };

  onLayoutChange = (layout, layouts) => {
    const { value, initialCycle } = this.props;
    console.log('layout 변경됨');
    initGrid();
    value.actions.saveToLocalStorage('userLayout', layouts);
    this.setState({ layouts: layouts });
    initialCycle();
    // console.log(this.refreshBtnRef);
    // this.refreshBtnRef.current.click();
  };

  render() {
    const { isLoadData } = this.state;
    console.log(this.state.dashboardOne);
    return (
      isLoadData && (
        <div className="bg-light">
          <Button onClick={() => this.resetLayout()}>Reset Layout</Button>
          <ResponsiveReactGridLayout
            className="layout"
            cols={{ lg: 3, md: 3, sm: 3, xs: 1, xxs: 1 }}
            rowHeight={400}
            layouts={this.state.layouts}
            onLayoutChange={(layout, layouts) =>
              this.onLayoutChange(layout, layouts)
            }
          >
            {this.createChartList(this.props.dashboardId)}
          </ResponsiveReactGridLayout>
        </div>
      )
    );
  }
}

export default withContext(DashboardGraphSection);
