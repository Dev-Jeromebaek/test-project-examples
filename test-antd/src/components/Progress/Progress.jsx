import React from 'react';
import PropTypes from 'prop-types';
// style
import './Progress.scss';
// components
import { Progress as AntdProgress, Tooltip } from 'antd';

// Properties that shared by all types.
const propTypes = {
  // to set the type, options: line, circle, dashboard
  type: PropTypes.string,
  // template function of the content
  // format: PropTypes.func,
  // to set the completion percentage
  percent: PropTypes.number,
  // whether to display the progress value and the status icon
  showInfo: PropTypes.bool,
  // to set the status of the Progress, options: success, exception, active, nomal
  status: PropTypes.string,
  // to set the style of the progress linecap
  strokeLinecap: PropTypes.oneOf(['round', 'square']),
  // color of progress bar
  // strokeColor: PropTypes.string,
  // segmented success percent
  successPercent: PropTypes.number,
  // tooltip title
  tooltip: PropTypes.string,
};
const defaultProps = {
  type: 'line',
  // format: percent => `${percent} %`,
  percent: 0,
  showInfo: true,
  status: 'active',
  strokeLinecap: 'round',
  // strokeColor: '#108ee9',
  successPercent: 0,
  tooltip: 'false',
};

// type="line"
const linePropTypes = {
  // to set the width of the progress bar, unit: px
  strokeWidth: PropTypes.number,
  // color of progress bar, render linear-gradient when passing an object
  // strokeColor: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.shape({ from: PropTypes.string, to: PropTypes.string, direction: PropTypes.string }),
  // ]),
};
const lineDefaultProps = {
  strokeWidth: 0,
  // color of progress bar, render linear-gradient when passing an object
  // strokeColor: #108ee9,
};

// type="circle"
const circlePropTypes = {
  // to set the canvas width of the circular progress, unit: px
  width: PropTypes.number,
  // to set the width of the circular progress, unit: percentage of the canvas width
  strokeWidth: PropTypes.number,
};
const circleDefaultProps = {
  width: 132,
  strokeWidth: 6,
};

// type="dashboard"
const dashPropTypes = {
  // to set the canvas width of the dashboard progress, unit: px
  width: PropTypes.number,
  // to set the width of the dashboard progress, unit: percentage of the canvas width
  strokeWidth: PropTypes.number,
  // the gap degree of half circle, 0 ~ 360
  gapDegree: PropTypes.number,
  // the gap position, options: top, bottom, left, right
  gapPosition: PropTypes.string,
};
const dashDefaultProps = {
  width: 132,
  strokeWidth: 6,
  gapDegree: 0,
  gapPosition: 'top',
};

const Progress = (props) => {
  const { tooltip, percent } = props;
  return tooltip ? (
    <Tooltip placement="top" title={`${percent} %`}>
      <AntdProgress {...props} />
    </Tooltip>
  ) : (
    <AntdProgress {...props} />
  );
};

const Line = (props) => {
  const { tooltip, percent } = props;
  return tooltip ? (
    <Tooltip placement="top" title={`${percent} %`}>
      <AntdProgress {...props} />
    </Tooltip>
  ) : (
    <AntdProgress {...props} />
  );
};

const Circle = (props) => {
  const { tooltip, percent } = props;
  return tooltip ? (
    <Tooltip placement="top" title={`${percent} %`}>
      <AntdProgress {...props} />
    </Tooltip>
  ) : (
    <AntdProgress {...props} />
  );
};

const Dashboard = (props) => {
  const { tooltip, percent } = props;
  return tooltip ? (
    <Tooltip placement="top" title={`${percent} %`}>
      <AntdProgress {...props} />
    </Tooltip>
  ) : (
    <AntdProgress {...props} />
  );
};

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;
Line.propTypes = { ...propTypes, ...linePropTypes };
Line.defaultProps = { ...defaultProps, ...lineDefaultProps };
Circle.propTypes = { ...propTypes, ...circlePropTypes };
Circle.defaultProps = { ...defaultProps, ...circleDefaultProps };
Dashboard.propTypes = { ...propTypes, ...dashPropTypes };
Dashboard.defaultProps = { ...defaultProps, ...dashDefaultProps };

Progress.Line = Line;
Progress.Circle = Circle;
Progress.Dashboard = Dashboard;

export default Progress;
