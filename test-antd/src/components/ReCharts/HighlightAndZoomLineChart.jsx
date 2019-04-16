import React, { PureComponent } from 'react';
import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceArea } from 'recharts';

const data = [
  { name: 1, cost: 4.11, impression: 0 },
  { name: 2, cost: 2.39, impression: 12000 },
  { name: 3, cost: 1.37, impression: 15000 },
  { name: 4, cost: 1.16, impression: 18000 },
  { name: 5, cost: 2.29, impression: 20000 },
  { name: 6, cost: 3, impression: 49900 },
  { name: 7, cost: 0.53, impression: 5000 },
  { name: 8, cost: 2.52, impression: 10000 },
  { name: 9, cost: 1.79, impression: 20000 },
  { name: 10, cost: 2.94, impression: 22200 },
  { name: 11, cost: 4.3, impression: 21000 },
  { name: 12, cost: 4.41, impression: 30000 },
  { name: 13, cost: 2.1, impression: 5000 },
  { name: 14, cost: 8, impression: 19000 },
  { name: 15, cost: 0, impression: 30000 },
  { name: 16, cost: 9, impression: 40000 },
  { name: 17, cost: 3, impression: 20000 },
  { name: 18, cost: 2, impression: 5000 },
  { name: 19, cost: 3, impression: 10000 },
  { name: 20, cost: 7, impression: 10000 },
];

const getAxisYDomain = (from, to, ref, offset) => {
  const refData = data.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const initialState = {
  data,
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+1',
  bottom: 'dataMin-1',
  top2: 'dataMax+20',
  bottom2: 'dataMin-20',
  animation: true,
};

export default class HighlightAndZoomLineChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  zoom() {
    let { refAreaLeft, refAreaRight, data } = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
    const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'impression', 50);

    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
      bottom2,
      top2,
    }));
  }

  zoomOut() {
    const { data } = this.state;
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
      top2: 'dataMax+50',
      bottom: 'dataMin+50',
    }));
  }

  render() {
    const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = this.state;

    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none' }}>
        <button href="javascript: void(0);" className="btn update" onClick={this.zoomOut.bind(this)}>
          Zoom Out
        </button>

        <LineChart
          width={800}
          height={400}
          data={data}
          onMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
          onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
          onMouseUp={this.zoom.bind(this)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis allowDataOverflow dataKey="name" domain={[left, right]} type="number" />
          <YAxis allowDataOverflow domain={[bottom, top]} type="number" yAxisId="1" />
          <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} type="number" yAxisId="2" />
          <Tooltip />
          <Legend />
          <Line yAxisId="1" type="natural" dot={false} dataKey="cost" stroke="#8884d8" animationDuration={300} />
          <Line yAxisId="2" type="natural" dot={false} dataKey="impression" stroke="#82ca9d" animationDuration={300} />

          {refAreaLeft && refAreaRight ? (
            <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
          ) : null}
        </LineChart>
      </div>
    );
  }
}
