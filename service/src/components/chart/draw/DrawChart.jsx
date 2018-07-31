import React, { Component } from 'react';

import { Card } from '../card/Card';
import { ChartDataSet } from '../variables/ChartDataSet';
import Line from '../types/Line';
import Bar from '../types/Bar';
import Pie from '../types/Pie';

class DrawChart extends Component {
  state = {
    setCycle: Math.floor(this.props.graphInfo[0].graphUpdateCycle / 60),
    cycleTime: 1,
    data: {
      labels: [],
      series: [],
    },
    legend: {
      names: [],
      types: [],
    },
    minutes: 0,
  };

  componentDidMount() {
    this.updateGraphData();
    // this.updateTimer = setInterval(this.proceedCycleTimer, 60000);
    this.updateTimer = setInterval(this.proceedCycleTimer, 1000);
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
        // console.log(this.state.cycleTime);
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

  onCycleChange = cycleTime => {
    this.setState({
      setCycle: cycleTime,
      cycleTime: 1,
    });
  };

  onRefreshClick = () => {
    this.setState({
      cycleTime: 1,
      minutes: 0,
    });
  };

  updateGraphData = () => {
    const {
      graphDataList,
      graphSubType,
      baseType,
      dataType,
    } = this.props.graphInfo[0];
    this.setState(
      ChartDataSet(
        graphDataList,
        graphSubType,
        baseType,
        dataType,
        this.state.setCycle,
      ),
    );
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
    const { graphSubType } = this.props.graphInfo[0];
    if (graphSubType === 'LINEAR_GRAPH')
      return (
        <Line data={this.state.data} cycleTime={this.state.cycleTime === 1} />
      );
    if (graphSubType === 'BAR_GRAPH')
      return (
        <Bar data={this.state.data} cycleTime={this.state.cycleTime === 1} />
      );
    if (graphSubType === 'PIE_GRAPH')
      return (
        <Pie data={this.state.data} cycleTime={this.state.cycleTime === 1} />
      );
  };
  render() {
    const { graphName, graphDescription } = this.props.graphInfo[0];
    return (
      <Card
        statsIcon="fa fa-history"
        title={graphName}
        category={graphDescription}
        content={<div className="ct-chart">{this.chartTypeCheck()}</div>}
        legend={this.createLegend(this.state.legend)}
        minutes={this.state.minutes}
        setCycle={this.onCycleChange}
        onRefresh={this.onRefreshClick}
      />
    );
  }
}

export default DrawChart;
