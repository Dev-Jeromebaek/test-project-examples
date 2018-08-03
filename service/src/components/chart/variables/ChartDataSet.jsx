export const ChartDataSet = (graphDataInfo, setCycle, cycleTitle) => {
  const {
    graphDataList,
    graphSubType,
    baseType,
    dataType,
  } = graphDataInfo.data;
  // console.log('funccc', graphDataList, graphSubType, baseType, dataType);
  const names =
    graphSubType === 'PIE_GRAPH'
      ? graphDataList.map(info => {
          return info.pieName;
        })
      : [['X: ' + baseType.title], ['Y: ' + dataType]];
  const types = ['info', 'danger', 'warning', 'grape', 'grass', 'sea'];

  let tempArr = [];

  const labels =
    graphSubType !== 'PIE_GRAPH'
      ? graphDataList.map(info => {
          tempArr.push(info.y);
          return info.x.split(' ~ ')[1];
        })
      : graphDataList.map(info => {
          tempArr.push(info.count);
          return '';
        });

  const series =
    graphSubType === 'BAR_GRAPH'
      ? // ? [tempArr]:
        tempArr.map((arr, index) => {
          let newArr = [];
          for (let j = 0; j < tempArr.length; j++) {
            newArr.push(index === j ? arr : 0);
          }
          return newArr;
        })
      : tempArr;
  // tempArr;
  return {
    cycleTime: setCycle,
    data: {
      labels: labels,
      series: series,
    },
    legend: {
      names: names,
      types: types,
    },
    minutes: 0,
    cycleTitle: cycleTitle,
  };
};
