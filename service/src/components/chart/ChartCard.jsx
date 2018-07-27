import React from 'react';
import Card from '../chart/card/Card';
import ChartistGraph from 'react-chartist';
import {
  dataPie,
  legendPie,
  optionSimplePie,
  optionDonutPie,
  drawListenerPie,
  // createListenerPie,
} from '../chart/variables/Pie';
import {
  dataLine,
  optionsLine,
  optionsArea,
  responsiveLine,
  legendLine,
  drawListenerLine,
  // createListenerLine,
} from '../chart/variables/Line';
import {
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  drawListenerBar,
  // createListenerBar,
} from '../chart/variables/Bar';
import GlobalDragAndDrop from '../global/GlobalDragAndDrop';

export default class ChartCard extends React.Component {
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

  render() {
    return (
      <GlobalDragAndDrop
        render={() => (
          <div>
            <Card
              className="bg-white"
              key="1"
              data-grid={{ w: 1, h: 1, x: 0, y: 0 }}
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
            <Card
              statsIcon="fa fa-history"
              id="chartHours"
              title="차트 이름"
              category="상세 설명"
              stats="Updated 3 minutes ago"
              className="bg-white"
              key="2"
              data-grid={{ w: 2, h: 1, x: 1, y: 0 }}
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
        )}
      />
    );
  }
}
