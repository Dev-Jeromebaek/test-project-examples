// Data for Line Chart
const dataLine = {
  labels: [
    '9:00AM',
    '12:00AM',
    '3:00PM',
    '6:00PM',
    '9:00PM',
    '12:00PM',
    '3:00AM',
    '6:00AM',
  ],
  series: [
    [287, 385, 490, 492, 554, 586, 698, 695],
    [67, 152, 143, 240, 287, 335, 435, 437],
    [23, 113, 67, 108, 190, 239, 307, 308],
  ],
};
const optionsLine = {
  low: 0,
  high: 800,
  showArea: false,
  height: '245px',
  axisX: {
    showGrid: false,
  },
  lineSmooth: true,
  showLine: true,
  showPoint: true,
  fullWidth: true,
  chartPadding: {
    right: 50,
  },
};
const optionsArea = {
  low: 0,
  high: 800,
  showArea: true,
  height: '245px',
  axisX: {
    showGrid: true,
  },
  lineSmooth: true,
  showLine: true,
  showPoint: true,
  fullWidth: true,
  chartPadding: {
    right: 50,
  },
};
const responsiveLine = [
  [
    'screen and (max-width: 640px)',
    {
      axisX: {
        labelInterpolationFnc: function(value) {
          return value[0];
        },
      },
    },
  ],
];
const legendLine = {
  names: ['1파랑', '1빨강', '1노랑'],
  types: ['info', 'danger', 'warning'],
};

const createListenerLine = {
  // draw: function(data) {
  create: function(data) {
    if (data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 2000 * data.index,
          dur: 2000,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
          // easing: Chartist.Svg.Easing.easeOutQuint
        },
      });
    }
  },
};

const drawListenerLine = {
  draw: function(data) {
    if (data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 2000 * data.index,
          dur: 2000,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
          // easing: Chartist.Svg.Easing.easeOutQuint
        },
      });
    }
  },
};

module.exports = {
  dataLine,
  optionsLine,
  optionsArea,
  responsiveLine,
  legendLine,
  drawListenerLine,
  createListenerLine,
};
