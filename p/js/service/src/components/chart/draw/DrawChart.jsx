import React, { Component } from 'react';

import { Card } from '../card/Card';
import { chartDataSet } from '../variables/ChartDataSet';
import Line from '../types/Line';
import Bar from '../types/Bar';
import Pie from '../types/Pie';
import { withContext } from '../../../Store';

import Spinner from '../../global/GlobalSpinner';
class DrawChart extends Component {
  state = {
    graphId: this.props.graphId,
    graphInfo: {},
    errer: '',
    setCycle: 3600,
    cycleTime: 1,
    minutes: 0,
    data: {
      labels: [],
      series: [],
    },
    legend: {
      names: [],
      types: [],
    },
    cycleTitle: '갱신 주기',
    isLoadData: false,
  };

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevProps);
  //   console.log(prevState);
  // }

  async componentDidMount() {
    const graphInfo = await this.props.value.actions.getGraphOne(
      this.props.dashboardId,
      this.state.graphId,
    );
    this.setState({
      graphInfo: graphInfo.data.data,
      isLoadData: true,
    });
    if (this.state.isLoadData) {
      this.updateGraphData();
      // this.updateTimer = setInterval(this.proceedCycleTimer, 60000);
      this.updateTimer = setInterval(this.proceedCycleTimer, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  proceedCycleTimer = () => {
    this.setState(
      {
        cycleTime: this.state.cycleTime - 1,
        minutes: this.state.minutes + 1,
      },
      () => {
        if (this.state.cycleTime < 1) {
          this.updateGraphData();
          return true;
        }
        if (this.state.setCycle < this.state.minutes) {
          this.updateGraphData();
          return true;
        }
      },
    );
  };

  onCycleChange = (cycleTime, newCycleTitle) => {
    this.props.value.actions.saveToLocalStorage(
      `setCycleTime-${this.state.graphId}`,
      cycleTime,
    );
    this.props.value.actions.saveToLocalStorage(
      `setCycleTitle-${this.state.graphId}`,
      newCycleTitle,
    );
    this.setState({
      setCycle: cycleTime,
      cycleTitle: newCycleTitle,
      cycleTime: 1,
    });
  };

  onRefreshClick = () => {
    this.setState({
      cycleTime: 1,
      minutes: 0,
    });
    this.updateGraphData();
  };

  updateGraphData = async () => {
    this.setState({
      isLoadData: false,
    });
    const graphInfo = await this.props.value.actions.getGraphOne(
      this.props.dashboardId,
      this.state.graphId,
    );
    this.setState({
      graphInfo: graphInfo.data.data,
      isLoadData: true,
    });

    if (this.state.isLoadData) {
      const { graphInfo } = this.state;
      this.setState(
        chartDataSet(
          graphInfo,
          this.props.value.actions.getFromLocalStorage(
            `setCycleTime-${this.state.graphId}`,
          ) || 3600,
          this.props.value.actions.getFromLocalStorage(
            `setCycleTitle-${this.state.graphId}`,
          ) || '갱신 주기',
        ),
      );
    }
  };

  createLegend = json => {
    let legend = [];

    for (let i = 0; i < json['names'].length; i++) {
      let type = 'fa fa-circle text-' + json['types'][i];
      legend.push(<i className={type} key={i} />);
      legend.push(' ');
      legend.push(json['names'][i]);
      legend.push(' ');
    }
    return legend;
  };

  chartTypeCheck = () => {
    // console.log(this.state.graphInfo.data);
    const { graphSubType } = this.state.graphInfo.graphType;
    if (graphSubType.code === 'LINEAR_GRAPH')
      return (
        <Line data={this.state.data} cycleTime={this.state.cycleTime === 1} />
      );
    if (graphSubType.code === 'BAR_GRAPH')
      return (
        <Bar data={this.state.data} cycleTime={this.state.cycleTime === 1} />
      );
    if (graphSubType.code === 'PIE_GRAPH')
      return (
        <Pie data={this.state.data} cycleTime={this.state.cycleTime === 1} />
      );
  };

  render() {
    console.log(this.state.graphId);
    console.log(this.state.graphInfo);
    const { graphName, graphDescription } = this.state.graphInfo;
    const { isLoadData } = this.state;
    return isLoadData ? (
      <Card
        statsIcon="fa fa-history"
        title={graphName}
        category={graphDescription}
        content={<div className="ct-chart">{this.chartTypeCheck()}</div>}
        legend={this.createLegend(this.state.legend)}
        minutes={this.state.minutes}
        setCycle={this.onCycleChange}
        cycleTitle={this.state.cycleTitle}
        onRefresh={this.onRefreshClick}
        // refreshBtnRef={this.props.refreshBtnRef}
        graphId={this.state.graphId}
      />
    ) : (
      // <div />
      <Spinner />
    );
  }
}

export default withContext(DrawChart);
