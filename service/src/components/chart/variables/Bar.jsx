// Data for Bar Chart
const dataBar = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  series: [
    [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
    [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695],
  ],
};
const optionsBar = {
  seriesBarDistance: 10,
  axisX: {
    showGrid: false,
  },
  height: '245px',
};
const responsiveBar = [
  [
    'screen and (max-width: 640px)',
    {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value[0];
        },
      },
    },
  ],
];
const legendBar = {
  names: ['Tesla Model S', 'BMW 5 Series'],
  types: ['info', 'danger'],
};

const drawListenerBar = {
  draw: function(data) {
    if (data.type === 'bar') {
      data.element.animate({
        y2: {
          begin: 0,
          dur: 500,
          from: data.y1,
          to: data.y2,
        },
      });
    }
  },
};

const createListenerBar = {
  create: function(data) {
    if (data.type === 'bar') {
      data.element.animate({
        y2: {
          begin: 0,
          dur: 500,
          from: data.y1,
          to: data.y2,
        },
      });
    }
  },
};

module.exports = {
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  drawListenerBar,
  createListenerBar,
};
