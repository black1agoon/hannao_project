import echarts from 'echarts/lib/echarts'

function checkAxisData (seriesData, xAxisData) {
  if (Array.isArray(xAxisData) && !xAxisData.length && seriesData.length) {
    const len = seriesData.map(s => s.data?.length || 0).sort()[seriesData.length - 1]
    return Array(len).fill(0).map((n, i) => i + 1)
  }
}

export function getDailyChartOptions (seriesData = [], customOptions = {}, xAxisData = null, unit = '') {
  xAxisData = checkAxisData(seriesData, xAxisData)
  return {
    grid: {
      left: 50,
      right: 50,
      bottom: 44,
      top: 68,
    },
    legend: {
      top: 10,
      right: 20,
      itemGap: 20,
      icon: 'bar',
      textStyle: {
        fontSize: 8,
        color: '#CCF2FF',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      show: true,
      axisLine: false,
      axisLabel: {
        showMinLabel: true,
        showMaxLabel: true,
        fontSize: 9,
        color: '#CCF2FF',
        show: true,
        inside: false,
        formatter: '{value}',
      },
    },
    yAxis: {
      name: '单位：' + (unit || 'kW·h'),
      nameTextStyle: {
        fontSize: 8,
        color: '#CCF2FF',
        padding: [0, 0, 18, 280],
      },
      type: 'value',
      axisLine: false,
      min: 0,
      axisLabel: {
        showMinLabel: false,
        showMaxLabel: false,
        fontSize: 9,
        color: '#CCF2FF',
        show: true,
        padding: [0, 0, 8, 0],
        inside: false,
        formatter: '{value}',
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: '#05164d',
        },
      },
    },
    series: seriesData.map(({ name, title, data, color }) => ({
      name: name || title,
      data: data,
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
            { offset: 0, color: color + 'aa' },
            { offset: 1, color: '#07085155' },
          ]),
        },
      },
    })),
    ...customOptions,
  }
}

export function getMonthlyChartOptions (seriesData = [], customOptions = {}, xAxisData = null, unit = '') {
  xAxisData = checkAxisData(seriesData, xAxisData) || xAxisData
  return {
    grid: {
      left: 50,
      right: 50,
      bottom: 44,
      top: 68,
    },
    legend: {
      top: 10,
      right: 10,
      icon: 'bar',
      textStyle: {
        fontSize: 8,
        color: '#CCF2FF',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      show: true,
      axisLine: false,
      axisLabel: {
        showMinLabel: true,
        showMaxLabel: true,
        fontSize: 9,
        color: '#CCF2FF',
        show: true,
        inside: false,
        formatter: '{value}',
      },
    },
    yAxis: [{
      name: '单位：' + (unit || 'kW·h'),
      nameTextStyle: {
        fontSize: 8,
        color: '#CCF2FF',
        padding: [0, 0, 18, 280],
      },
      type: 'value',
      axisLine: false,
      axisLabel: {
        showMinLabel: false,
        fontSize: 9,
        color: '#CCF2FF',
      },
      splitLine: {
        lineStyle: {
          width: 2,
          color: '#05164d',
        },
      },
    }, {
      type: 'value',
      axisLine: false,
      splitLine: false,
      axisLabel: {
        showMinLabel: false,
        fontSize: 9,
        color: '#CCF2FF',
      },
    }],
    series: seriesData.map(({ name, title, data, color, type }) => {
      const isLine = !type || type === 'line'
      return isLine ? {
        name: name || title,
        data: data,
        smooth: true,
        type: 'line',
        yAxisIndex: 1,
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
              { offset: 0, color: color + 'aa' },
              { offset: 1, color: '#07085155' },
            ]),
          },
        },
      } : {
        name: name || title,
        data: data,
        smooth: true,
        type: type,
        yAxisIndex: 0,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: color },
            { offset: 1, color: color + '33' },
          ]),
        },
        barWidth: 5,
      }
    }),
    ...customOptions,
  }
}

export function getStockChartOptions (seriesData = [], customOptions = {}, xAxisData = null) {
  return getDailyChartOptions(seriesData, {
    ...customOptions,
    grid: {
      left: 50,
      right: 50,
      bottom: 24,
      top: 54,
    },
    yAxis: {
      name: '单位：箱',
      nameTextStyle: {
        fontSize: 8,
        color: '#CCF2FF',
        padding: [0, 0, 6, 310],
      },
      type: 'value',
      axisLine: false,
      min: 0,
      max: 1001,
      axisLabel: {
        showMinLabel: false,
        showMaxLabel: false,
        fontSize: 9,
        color: '#CCF2FF',
        show: true,
        padding: [0, 0, 8, 0],
        inside: false,
        formatter: '{value}',
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: '#05164d',
        },
      },
    },
  }, xAxisData)
}

export function getDeviceOutputChartOptions (seriesData = [], customOptions = {}, xAxisData = []) {
  if (!xAxisData.length && seriesData.length) {
    const len = seriesData.map(s => s.data?.length || 0).sort()[seriesData.length - 1]
    xAxisData = Array(len).fill(0).map((n, i) => i + 1)
  }
  return {
    grid: {
      left: 58,
      right: 50,
      bottom: 42,
      top: 63,
    },
    legend: {
      top: 20,
      right: 20,
      icon: 'bar',
      textStyle: {
        fontSize: 8,
        color: '#CCF2FF',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      show: true,
      axisLine: false,
      axisLabel: {
        showMinLabel: true,
        showMaxLabel: true,
        fontSize: 9,
        color: '#CCF2FF',
        show: true,
        inside: false,
        formatter: '{value}',
        padding: [6, 0, 0, 0],
      },
    },
    yAxis: {
      type: 'value',
      axisLine: false,
      splitLine: false,
      axisLabel: {
        showMinLabel: false,
        fontSize: 9,
        color: '#CCF2FF',
        padding: [0, 8, 0, 0],
      },
    },
    series: seriesData.map(({ name, title, data, color }) => {
      return {
        name: name || title,
        data: data,
        smooth: true,
        type: 'bar',
        yAxisIndex: 0,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: color },
            { offset: 1, color: color + '33' },
          ]),
        },
        barWidth: 5,
      }
    }),
    ...customOptions,
  }
}
