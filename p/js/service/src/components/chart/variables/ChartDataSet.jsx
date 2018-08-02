const chartDataSet = (graphDataInfo, setCycle, cycleTitle) => {
  const { graphDataList, graphType, baseType, dataType } = graphDataInfo;
  console.log(graphType);
  const names =
    graphType.categories[0].code === 'PIE_GRAPH'
      ? graphDataList.map(info => {
          return info.pieName;
        })
      : [['X: ' + baseType.title], ['Y: ' + dataType]];
  const types = ['info', 'danger', 'warning', 'grape', 'grass', 'sea'];

  let tempArr = [];

  const labels =
    graphType.categories[0].code !== 'PIE_GRAPH'
      ? graphDataList.map(info => {
          tempArr.push(info.dataY);
          return info.dataX.split(' ~ ')[1];
        })
      : graphDataList.map(info => {
          tempArr.push(info.count);
          return '';
        });

  const series =
    graphType.categories[0].code === 'BAR_GRAPH'
      ? tempArr.map((arr, index) => {
          let newArr = [];
          for (let j = 0; j < tempArr.length; j++) {
            newArr.push(index === j ? arr : 0);
          }
          return newArr;
        })
      : tempArr;
  return {
    cycleTime: setCycle,
    minutes: 0,
    data: {
      labels: labels,
      series: series,
    },
    legend: {
      names: names,
      types: types,
    },
    cycleTitle: cycleTitle,
  };
};

module.exports = {
  chartDataSet,
};
