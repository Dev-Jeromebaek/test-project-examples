import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';

import ChartistGraph from 'react-chartist';
import Card from '../components/chart/card/Card';
import {
  dataPie,
  legendPie,
  optionSimplePie,
  optionDonutPie,
  drawListenerPie,
  // createListenerPie,
} from '../components/chart/variables/Pie';
import {
  dataLine,
  optionsLine,
  optionsArea,
  responsiveLine,
  legendLine,
  drawListenerLine,
  // createListenerLine,
} from '../components/chart/variables/Line';
import {
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  drawListenerBar,
  // createListenerBar,
} from '../components/chart/variables/Bar';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS('layouts') || {};

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
export default class ResponsiveRGLTest extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
  }

  // 차트 legend 추가 로직 [2018.07.26 - yeob]
  createLegend = json => {
    let legend = [];

    for (let i = 0; i < json['names'].length; i++) {
      let type = 'fa fa-circle text-' + json['types'][i];
      legend.push(<i className={type} key={i} />);
      legend.push(' ');
      legend.push(json['names'][i]);
    }
    return legend;
  };

  static get defaultProps() {
    return {
      className: 'layout',
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30,
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS('layouts', layouts);
    this.setState({ layouts });
  }

  render() {
    return (
      <div className="bg-light my-3">
        <button onClick={() => this.resetLayout()}>Reset Layout</button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 3, md: 3, sm: 2, xs: 2, xxs: 1 }}
          rowHeight={400}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <div
            className="bg-white"
            key="1"
            data-grid={{ w: 1, h: 1, x: 0, y: 0 }}
          >
            {/* <span className="text">1</span> */}
            <Card
              statsIcon="fa fa-history"
              title="차트 이름"
              category="상세 설명"
              stats="Updated 10 minutes ago"
              content={
                <div id="chartPreferences" className="ct-chart">
                  <ChartistGraph
                    data={dataPie}
                    type="Pie"
                    options={optionDonutPie}
                    listener={drawListenerPie}
                  />
                </div>
              }
              legend={
                <div className="legend">{this.createLegend(legendPie)}</div>
              }
            />
          </div>
          <div
            className="bg-white"
            key="2"
            data-grid={{ w: 2, h: 1, x: 1, y: 0 }}
          >
            {/* <span className="text">2</span> */}
            <Card
              statsIcon="fa fa-history"
              id="chartHours"
              title="차트 이름"
              category="상세 설명"
              stats="Updated 3 minutes ago"
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={dataLine}
                    type="Line"
                    options={optionsLine}
                    responsiveOptions={responsiveLine}
                    listener={drawListenerLine}
                  />
                </div>
              }
              legend={
                <div className="legend">{this.createLegend(legendLine)}</div>
              }
            />
          </div>
          <div
            className="bg-white"
            key="3"
            data-grid={{ w: 1, h: 1, x: 0, y: 1 }}
          >
            {/* <span className="text">3</span> */}
            <Card
              statsIcon="fa fa-history"
              id="chartHours"
              title="차트 이름"
              category="상세 설명"
              stats="Updated 3 minutes ago"
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={dataLine}
                    type="Bar"
                    options={optionsLine}
                    responsiveOptions={responsiveLine}
                    listener={drawListenerBar}
                  />
                </div>
              }
              legend={
                <div className="legend">{this.createLegend(legendLine)}</div>
              }
            />
          </div>
          <div
            className="bg-white"
            key="4"
            data-grid={{ w: 1, h: 1, x: 1, y: 1 }}
          >
            {/* <span className="text">4</span> */}
            <Card
              statsIcon="fa fa-history"
              id="chartHours"
              title="차트 이름"
              category="상세 설명"
              stats="Updated 3 minutes ago"
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={dataLine}
                    type="Line"
                    options={optionsArea}
                    responsiveOptions={responsiveLine}
                    listener={drawListenerLine}
                  />
                </div>
              }
              legend={
                <div className="legend">{this.createLegend(legendLine)}</div>
              }
            />
          </div>
          <div
            className="bg-white"
            key="5"
            data-grid={{ w: 1, h: 1, x: 2, y: 1 }}
          >
            {/* <span className="text">5</span> */}
            <Card
              statsIcon="fa fa-history"
              id="chartHours"
              title="차트 이름"
              category="상세 설명"
              stats="Updated 3 minutes ago"
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={dataBar}
                    type="Bar"
                    options={optionsBar}
                    responsiveOptions={responsiveBar}
                    listener={drawListenerBar}
                  />
                </div>
              }
              legend={
                <div className="legend">{this.createLegend(legendBar)}</div>
              }
            />
          </div>
          <div
            className="bg-white"
            key="6"
            data-grid={{ w: 2, h: 1, x: 0, y: 2 }}
          >
            <span className="text">6</span>
          </div>
          <div
            className="bg-white"
            key="7"
            data-grid={{ w: 1, h: 1, x: 2, y: 2 }}
          >
            {/* <span className="text">7</span> */}
            <Card
              statsIcon="fa fa-history"
              title="차트 이름"
              category="상세 설명"
              stats="Updated 10 minutes ago"
              content={
                <div id="chartPreferences" className="ct-chart">
                  <ChartistGraph
                    data={dataPie}
                    type="Pie"
                    options={optionSimplePie}
                    listener={drawListenerPie}
                  />
                </div>
              }
              legend={
                <div className="legend">{this.createLegend(legendPie)}</div>
              }
            />
          </div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-8',
      JSON.stringify({
        [key]: value,
      }),
    );
  }
}
