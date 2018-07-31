import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';

import {
  optionsLine,
  // optionsArea,
  responsiveLine,
  drawListenerLine
  // createListenerLine
} from '../variables/LineOptionSet';

class Line extends Component {
  shouldComponentUpdate() {
    if (this.props.cycleTime) {
      return true;
    }
    return false;
  }
  render() {
    // console.log(this.props);
    const { data } = this.props;
    const lineData = {
      labels: data.labels,
      series: [data.series]
    };
    return (
      <ChartistGraph
        data={lineData}
        type="Line"
        options={optionsLine}
        responsiveOptions={responsiveLine}
        listener={drawListenerLine}
      />
    );
  }
}

export default Line;
