import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Button } from 'reactstrap';

// import CartManagement from '../components/chart/variables/ChartManagement';
import DrawChart from '../components/chart/draw/DrawChart';
import {
  setGridLayout,
  initGrid,
} from '../components/chart/variables/ChartLayoutSet';
// import graphData from '../components/chart/data/getGraphData.json';
import { withContext } from '../Store';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class DashboardGraphSection extends React.PureComponent {
  originalLayouts =
    this.props.value.actions.getFromLocalStorage('userLayout') || {};

  // refreshBtnRef = React.createRef();

  state = {
    layouts: JSON.parse(JSON.stringify(this.originalLayouts)),
    dashboardOne: [],
    isReSized: false,
    isLoadData: false,
  };

  async componentDidMount() {
    const dashboardOne = await this.props.value.actions.getDashboardOne(
      this.props.dashboardId,
    );
    this.setState({
      dashboardOne: dashboardOne.data,
      isLoadData: true,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.dashboardOne !== nextState.dashboardOne) return true;
    // console.log(this.state.layouts);
    // console.log(nextState.layouts);
    // if (this.state.layouts !== nextState.layouts) return true;
    return false;
  }

  createChartList = id => {
    initGrid();
    // 1개의 dashboard에 포함된 graphCollectionList 정보(배열)
    if (this.state.dashboardOne.length !== 0) {
      const { graphCollectionList } = this.state.dashboardOne.data;
      const chartList = graphCollectionList.map(ct_info => {
        return (
          <div
            className="bg-white"
            key={ct_info.collectionId}
            data-grid={setGridLayout(ct_info)}
          >
            <DrawChart
              dashboardId={this.props.dashboardId}
              graphId={ct_info.graphId}
              key={ct_info.collectionId}
              // refreshBtnRef={this.refreshBtnRef}
            />
          </div>
        );
      });
      return chartList;
    }
  };
  // createChartList = id => {
  //   initGrid();
  //   // console.log(this.state.dashboardOne);
  //   // 1개의 dashboard에 포함된 graphCollectionList 정보(배열)
  //   const { graphCollectionList } = graphData.dashboard_list[id - 1];
  //   // console.log(graphCollectionList);
  //   const chartList = graphCollectionList.map(ct_info => {
  //     return (
  //       <div
  //         className="bg-white"
  //         key={ct_info.collectionId}
  //         data-grid={setGridLayout(ct_info)}
  //       >
  //         <DrawChart
  //           graphInfo={this.passOnGraphData(ct_info.graphId)}
  //           key={ct_info.collectionId}
  //           refreshBtnRef={this.refreshBtnRef}
  //         />
  //       </div>
  //     );
  //   });
  //   return chartList;
  // };

  resetLayout = () => {
    initGrid();
    this.setState({ layouts: {} });
  };

  onLayoutChange = (layout, layouts) => {
    console.log('layout 변경됨');
    initGrid();
    // console.log(layout);
    // console.log(layouts);
    this.props.value.actions.saveToLocalStorage('userLayout', layouts);
    this.setState({ layouts: layouts });
    // console.log(this.refreshBtnRef.current);
    // console.log(this.refreshBtnRefArr);
    // this.refreshBtnRef.current.click();
  };

  render() {
    return;
    {
      this.state.isLoadData && (
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
}

export default withContext(DashboardGraphSection);
