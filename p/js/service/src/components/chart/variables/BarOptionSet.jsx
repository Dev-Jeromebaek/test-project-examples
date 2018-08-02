// Data for Bar Chart
const optionsBar = {
  seriesBarDistance: 10,
  axisX: {
    showGrid: false,
  },
  height: '245px',
};
const responsiveBar = [
  [
    'screen and (max-width: 1560px) and (min-width:1000px)',
    {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          const sliceValue = value.split(' ')[1];
          return sliceValue;
        },
      },
    },
  ],
  [
    'screen and (max-width: 767px) and (min-width: 550px)',
    {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value;
        },
      },
    },
  ],
  [
    'screen and (max-width: 550px)',
    {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          const sliceValue = value.split(' ')[1];
          return sliceValue;
        },
      },
    },

    // 'screen and (max-width: 640px)',
    // {
    //   seriesBarDistance: 5,
    //   axisX: {
    //     labelInterpolationFnc: function(value) {
    //       console.log(value);
    //       const sliceValue = value.split(' ')[1];
    //       console.log(sliceValue);
    //       // return value[0];
    //       return sliceValue;
    //     }
    //   }
    // }
  ],
];

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
  optionsBar,
  responsiveBar,
  drawListenerBar,
  createListenerBar,
};
