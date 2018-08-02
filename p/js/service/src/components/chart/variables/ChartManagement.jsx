import React, { Component } from 'react';

import DrawChart from '../draw/DrawChart';
import { withContext } from '../../../Store';

class ChartManagement extends Component {
  constructor(props) {
    super(props);
    this.getGraphInfoOne();
  }
  state = {
    graphId: this.props.graphId,
    graphInfo: {},
  };

  async getGraphInfoOne() {
    console.log('getGraphInfoOne');
    const graphInfo = await this.props.value.actions.getGraphOne(
      this.props.dashboardId,
      this.state.graphId,
    );
    return graphInfo.data;
  }

  componentWillMount() {
    console.log('componentWill');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    console.log(nextProps);
    console.log(nextState);
    console.log(this.state.graphInfo);
    console.log(nextState.graphInfo);
    if (this.state.graphInfo === nextState.graphInfo) return false;
    return false;
  }

  render() {
    // console.log(this.state.graphInfo);
    // console.log(this.props);
    return (
      <DrawChart
        dashboardId={this.props.dashboardId}
        graphId={this.props.graphId}
        graphInfo={this.state.graphInfo}
      />
    );
  }
}

export default withContext(ChartManagement);
