import echarts from 'vue-echarts/dist/vue-echarts'

export const STATION = {
  REGIONS: {
    north: {},
    center: {}
  }
}

export const ORDER = {
  REGIONS: {
    north: {},
    center: {}
  },
  LINE_OPTIONS: {
    color: ['#975FE4'], //
    title: {
      text: '每日生产数量趋势',
      textStyle: {
        fontSize: 14,
        color: '#999999'
      },
      left: 20
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#d8d8d8'
        }
      },
      padding: 10,
      formatter: (params) => {
        return `${params[0].marker} ${params[0].name}日</br>${params[0].seriesName}: ${params[0].value}`
      }
    },
    grid: {
      left: '2%',
      right: '6%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        name: '(日期)',
        nameTextStyle: {
          color: '#707070'
        },
        type: 'category',
        // boundaryGap: false,
        data: [],
        axisLabel: {
          color: '#606266'
        },
        axisLine: {
          lineStyle: {
            color: '#eeeeee'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: '(双)',
        nameTextStyle: {
          color: '#707070',
          padding: [0, 15, 0, 0]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          color: '#606266'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitArea: {
          areaStyle: {
            color: '#ffffff'
          }
        }
      }
    ],
    series: [
      {
        name: '生产数量',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: '#975FE4'},
              {offset: 1, color: '#ffffff'}
            ])
          }
        }
      }
    ]
  },
  LINE_OPTIONS2: {
    color: ['#11C1C1'], //
    title: {
      text: '当日生产数量趋势',
      textStyle: {
        fontSize: 14,
        color: '#999999'
      },
      left: 20
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#d8d8d8'
        }
      },
      padding: 10,
      formatter: (params) => {
        return `${params[0].marker} ${params[0].name}日</br>${params[0].seriesName}: ${params[0].value}`
      }
    },
    grid: {
      left: '2%',
      right: '6%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        name: '(时)',
        nameTextStyle: {
          color: '#707070'
        },
        type: 'category',
        // boundaryGap: false,
        data: [],
        axisLabel: {
          color: '#606266'
        },
        axisLine: {
          lineStyle: {
            color: '#eeeeee'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: '(双)',
        nameTextStyle: {
          color: '#707070',
          padding: [0, 15, 0, 0]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          color: '#606266'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitArea: {
          areaStyle: {
            color: '#ffffff'
          }
        }
      }
    ],
    series: [
      { name: '产量',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: '#11C1C1'},
              {offset: 1, color: '#ffffff'}
            ])
          }
        }
      }
    ]
  }
}
