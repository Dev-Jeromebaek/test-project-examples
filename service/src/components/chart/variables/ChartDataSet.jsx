export const ChartDataSet = (
  graphDataList,
  graphSubType,
  baseType,
  dataType,
  setCycle
) => {
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

  // 1. 각각 x 값마다 색상 다르게 그래프 그리기.
  const series =
    graphSubType === 'BAR_GRAPH'
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
    data: {
      labels: labels,
      series: series
    },
    legend: {
      names: names,
      types: types
    },
    minutes: 0
  };
};
