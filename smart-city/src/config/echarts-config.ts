import echarts from 'echarts/lib/echarts';

export const getPieChartOptions = (info: any) => ({
  color: info.color,
  title: {
    text: info.label,
    x: 'left',
    y: 20,
    textStyle: {
      color: 'white',
      fontWeight: 'normal',
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {d}%',
  },
  legend: {
    x: 'right',
    y: 'center',
    orient: 'right',
    textStyle: {
      color: 'white',
      rich: {
        colorful: { color: 'aqua' },
      },
    },
    formatter: (name: string) => {
      const floor = info.data.find((floorData: any) => floorData.name === name);
      return name + (floor ? `  {colorful|${floor.value}%}` : '');
    },
  },
  series: info ? [
    {
      name: info.label,
      type: 'pie',
      radius: [30, 80],
      center: ['35%', '50%'],
      roseType: 'area',
      data: info.data,
      label: false,
      labelLine: false,
    },
  ] : [],
});

export const lineColors = {
  water: ['#00FFFF', '#5574ff'],
  electricity: ['#FFAD00', '#B4FF00'],
};

export const getLineChartOptions = (info: any = {}) => {
  return {
    grid: {
      left: 80,
      right: 80,
      bottom: 40,
      top: 60,
    },
    title: {
      text: info.title,
      x: 100,
      y: 20,
      textStyle: {
        color: '#BCE3FD',
        fontWeight: 'normal',
      },
    },
    tooltip: {
      trigger: 'axis',
      position(pt: any[]) {
        return [pt[0], '10%'];
      },
    },
    legend: {
      right: 20,
      top: 40,
      icon: 'circle',
      textStyle: {
        color: '#fffa',
      },
    },
    xAxis: {
      type: 'category',
      name: '月份',
      nameTextStyle: {
        fontSize: 11,
        color: '#BCE3FD',
      },
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#fff8',
        },
      },
      axisTick: false,
      axisLabel: {
        fontSize: 11,
        color: '#BCE3FD',
      },
      data: Array(12).fill(0).map((n, i) => i + 1),
    },
    yAxis: {
      type: 'value',
      name: info.unit,
      nameTextStyle: {
        fontSize: 11,
        color: '#BCE3FD',
        padding: [0, 0, 0, -20],
      },
      splitLine: false,
      axisTick: false,
      axisLine: false,
      axisLabel: {
        fontSize: 11,
        color: '#BCE3FD',
      },
    },
    series: info.data.map(({ name, data, color }: any) => ({
      name,
      data,
      smooth: true,
      type: 'line',
      itemStyle: {
        opacity: 0,
        color,
      },
      lineStyle: {
        color,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: color + '88' },
            { offset: 1, color: color + '44' },
          ]),
        },
      },
    })),
  };
};
