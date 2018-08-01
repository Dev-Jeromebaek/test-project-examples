import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';

import {
  // optionSimplePie,
  optionDonutPie,
  drawListenerPie
  // createListenerPie
} from '../variables/PieOptionSet';

class Pie extends Component {
  shouldComponentUpdate() {
    if (this.props.cycleTime) {
      return true;
    }
    return false;
  }

  render() {
    // console.log(this.props);
    return (
      <ChartistGraph
        data={this.props.data}
        type="Pie"
        options={optionDonutPie}
        listener={drawListenerPie}
      />
    );
  }
}

export default Pie;
