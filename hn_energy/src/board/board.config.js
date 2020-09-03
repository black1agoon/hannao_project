import echarts from 'vue-echarts/dist/vue-echarts'

export const POINTS = [[1075, 667], [750, 635], [552, 568], [527, 527], [508, 496], [600, 430], [785, 320]]
export const FLOORS = [
  {
    name: '一楼',
    pos: [976, 806]
  }, {
    name: '二楼',
    pos: [672, 806]
  }, {
    name: '三楼',
    pos: [368, 806]
  }, {
    name: '四楼',
    pos: [57, 806]
  }, {
    name: '五楼',
    pos: [57, 571]
  }, {
    name: '六楼',
    pos: [57, 334]
  }, {
    name: '七楼',
    pos: [57, 98]
  }
]
export const LINES = [
  {
    width: 1130,
    height: 822,
    path: 'M1086 673 L1115 673 L1115 807'
  }, {
    width: 830,
    height: 822,
    path: 'M761 641 L812 641 L812 807'
  }, {
    width: 830,
    height: 822,
    path: 'M551 575 L505 575 L505 807'
  }, {
    width: 532,
    height: 822,
    path: 'M527 533 L457 533 L457 792 L193 792 L193 807'
  }, {
    width: 510,
    height: 684,
    path: 'M508 501 L396 501 L396 671 L332 671'
  }, {
    width: 620,
    height: 440,
    path: 'M600 436 L332 436'
  }, {
    width: 800,
    height: 334,
    path: 'M784 325 L396 325 L396 195 L332 195'
  }
]
export const RIGHT_OPTIONS1 = {
  color: ['#EB6100', '#FFDE00'], //
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
      return params.reduce((rst, cur, i) => {
        return rst + `${cur.marker}${cur.seriesName}用水</br>${cur.name}月: ${cur.value}t` + (i === params.length - 1 ? '' : '</br>')
      }, '')
    }
  },
  grid: {
    top: '20%',
    left: '5%',
    right: '10%',
    bottom: '4%',
    containLabel: true
  },
  legend: {
    icon: 'circle',
    textStyle: {
      color: '#ffffff'
    },
    right: '8%',
    top: 0
  },
  xAxis: [
    {
      name: '( 月 )',
      nameTextStyle: {
        color: '#ffffff',
        padding: [30, 0, 0, 0]
      },
      type: 'category',
      // boundaryGap: false,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      axisLabel: {},
      axisLine: {
        lineStyle: {
          color: '#ffffff'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      name: '( t )',
      nameTextStyle: {
        color: '#ffffff',
        padding: [0, 30, 0, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {},
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: ['rgba(255, 255, 255, .3)']
        }
      },
      splitArea: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '2019年',
      symbol: 'circle',
      type: 'line',
      smooth: true,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(235, 97, 0, 0.48)'},
            {offset: 1, color: 'rgba(7, 8, 81, 0.29)'}
          ])
        }
      }
    },
    {
      name: '2018年',
      symbol: 'circle',
      type: 'line',
      smooth: true,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(255, 222, 0, 0.48)'},
            {offset: 1, color: 'rgba(7, 8, 81, 0.29)'}
          ])
        }
      }
    }
  ]
}
export const RIGHT_OPTIONS2 = {
  color: ['#00FFFF', '#FF00FF'], //
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
      return params.reduce((rst, cur, i) => {
        return rst + `${cur.marker}${cur.seriesName}用电</br>${cur.name}月: ${cur.value}kwh` + (i === params.length - 1 ? '' : '</br>')
      }, '')
    }
  },
  grid: {
    top: '20%',
    left: '5%',
    right: '10%',
    bottom: '4%',
    containLabel: true
  },
  legend: {
    icon: 'circle',
    textStyle: {
      color: '#ffffff'
    },
    right: '8%',
    top: 0
  },
  xAxis: [
    {
      name: '( 月 )',
      nameTextStyle: {
        color: '#ffffff',
        padding: [30, 0, 0, 0]
      },
      type: 'category',
      // boundaryGap: false,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      axisLabel: {},
      axisLine: {
        lineStyle: {
          color: '#ffffff'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      name: '( kwh )',
      nameTextStyle: {
        color: '#ffffff',
        padding: [0, 30, 0, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {},
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: ['rgba(255, 255, 255, .3)']
        }
      },
      splitArea: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '',
      symbol: 'circle',
      type: 'line',
      smooth: true,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(0, 255, 255, 0.48)'},
            {offset: 1, color: 'rgba(7, 8, 81, 0.29)'}
          ])
        }
      }
    },
    {
      name: '',
      symbol: 'circle',
      type: 'line',
      smooth: true,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(255, 0, 255, 0.48)'},
            {offset: 1, color: 'rgba(7, 8, 81, 0.29)'}
          ])
        }
      }
    }
  ]
}
export const RIGHT_OPTIONS3 = {
  color: ['#EB6100', '#FFDE00', '#00FFFF'], //
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#d8d8d8'
      }
    },
    padding: 10
  },
  grid: {
    top: '20%',
    left: '5%',
    right: '10%',
    bottom: '4%',
    containLabel: true
  },
  legend: {
    icon: 'circle',
    textStyle: {
      color: '#ffffff'
    },
    right: '8%',
    top: 0
  },
  xAxis: [
    {
      name: '( 楼层 )',
      nameTextStyle: {
        color: '#ffffff',
        padding: [30, 0, 0, 0]
      },
      type: 'category',
      // boundaryGap: false,
      data: ['一楼', '二楼', '三楼', '四楼', '五楼', '六楼', '七楼'],
      axisLabel: {},
      axisLine: {
        lineStyle: {
          color: '#ffffff'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      name: '( t )',
      nameTextStyle: {
        color: '#ffffff',
        padding: [0, 30, 0, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {},
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: ['rgba(255, 255, 255, .3)']
        }
      },
      splitArea: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '今天',
      symbol: 'circle',
      type: 'bar',
      smooth: true,
      barWidth: 15,
      data: [10, 20, 20, 30, 30, 30, 25]
    },
    {
      name: '昨天',
      symbol: 'circle',
      type: 'bar',
      smooth: true,
      barWidth: 15,
      data: [20, 30, 30, 40, 40, 40, 35]
    },
    {
      name: '前天',
      symbol: 'circle',
      type: 'bar',
      smooth: true,
      barWidth: 15,
      data: [30, 40, 40, 50, 50, 50, 45]
    }
  ]
}
export const RIGHT_OPTIONS4 = {
  color: ['#EB6100', '#FFDE00', '#00FFFF'], //
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#d8d8d8'
      }
    },
    padding: 10
  },
  grid: {
    top: '20%',
    left: '5%',
    right: '10%',
    bottom: '4%',
    containLabel: true
  },
  legend: {
    icon: 'circle',
    textStyle: {
      color: '#ffffff'
    },
    right: '8%',
    top: 0
  },
  xAxis: [
    {
      name: '( 楼层 )',
      nameTextStyle: {
        color: '#ffffff',
        padding: [30, 0, 0, 0]
      },
      type: 'category',
      // boundaryGap: false,
      data: [],
      axisLabel: {},
      axisLine: {
        lineStyle: {
          color: '#ffffff'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      name: '( kwh )',
      nameTextStyle: {
        color: '#ffffff',
        padding: [0, 30, 0, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {},
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: ['rgba(255, 255, 255, .3)']
        }
      },
      splitArea: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '今天',
      symbol: 'circle',
      barWidth: 15,
      type: 'bar',
      smooth: true,
      data: []
    },
    {
      name: '昨天',
      symbol: 'circle',
      type: 'bar',
      barWidth: 15,
      smooth: true,
      data: []
    },
    {
      name: '前天',
      symbol: 'circle',
      type: 'bar',
      barWidth: 15,
      smooth: true,
      data: []
    }
  ]
}

export const FLOOR_OPTIONS = [
  {
    color: ['#00FFFF', '#FFAD00'], //
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
        return params.reduce((rst, cur, i) => {
          return rst + `${cur.marker} 用${cur.seriesName}: ${cur.value} ` + (cur.seriesIndex === 0 ? 't' : 'kwh') + (i === params.length - 1 ? '' : '</br>')
        }, `${params[0].name}</br>`)
      }
    },
    grid: {
      top: '25%',
      left: '8%',
      right: '8%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: 't',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 20, 0, 0]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }, {
        name: 'kwh',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 0, 0, 30]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '水',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(0, 255, 255, 0.5)'},
              {offset: 1, color: 'rgba(0, 255, 255, 0)'}
            ])
          }
        }
      },
      {
        name: '电',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(223, 163, 18, 0.5)'},
              {offset: 1, color: 'rgba(255, 255, 255, 0)'}
            ])
          }
        }
      }
    ]
  },
  {
    color: ['#00FFFF', '#FFAD00'], //
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
        return params.reduce((rst, cur, i) => {
          return rst + `${cur.marker} 用${cur.seriesName}: ${cur.value} ` + (cur.seriesIndex === 0 ? 't' : 'kwh') + (i === params.length - 1 ? '' : '</br>')
        }, `${params[0].name}</br>`)
      }
    },
    grid: {
      top: '25%',
      left: '8%',
      right: '8%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: 't',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 20, 0, 0]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }, {
        name: 'kwh',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 0, 0, 30]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '水',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(0, 255, 255, 0.5)'},
              {offset: 1, color: 'rgba(0, 255, 255, 0)'}
            ])
          }
        }
      },
      {
        name: '电',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(223, 163, 18, 0.5)'},
              {offset: 1, color: 'rgba(255, 255, 255, 0)'}
            ])
          }
        }
      }
    ]
  },
  {
    color: ['#00FFFF', '#FFAD00'], //
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
        return params.reduce((rst, cur, i) => {
          return rst + `${cur.marker} 用${cur.seriesName}: ${cur.value} ` + (cur.seriesIndex === 0 ? 't' : 'kwh') + (i === params.length - 1 ? '' : '</br>')
        }, `${params[0].name}</br>`)
      }
    },
    grid: {
      top: '25%',
      left: '8%',
      right: '8%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: 't',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 20, 0, 0]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }, {
        name: 'kwh',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 0, 0, 30]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '水',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(0, 255, 255, 0.5)'},
              {offset: 1, color: 'rgba(0, 255, 255, 0)'}
            ])
          }
        }
      },
      {
        name: '电',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(223, 163, 18, 0.5)'},
              {offset: 1, color: 'rgba(255, 255, 255, 0)'}
            ])
          }
        }
      }
    ]
  },
  {
    color: ['#00FFFF', '#FFAD00'], //
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
        return params.reduce((rst, cur, i) => {
          return rst + `${cur.marker} 用${cur.seriesName}: ${cur.value} ` + (cur.seriesIndex === 0 ? 't' : 'kwh') + (i === params.length - 1 ? '' : '</br>')
        }, `${params[0].name}</br>`)
      }
    },
    grid: {
      top: '25%',
      left: '8%',
      right: '8%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: 't',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 20, 0, 0]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }, {
        name: 'kwh',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 0, 0, 30]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '水',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(0, 255, 255, 0.5)'},
              {offset: 1, color: 'rgba(0, 255, 255, 0)'}
            ])
          }
        }
      },
      {
        name: '电',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(223, 163, 18, 0.5)'},
              {offset: 1, color: 'rgba(255, 255, 255, 0)'}
            ])
          }
        }
      }
    ]
  },
  {
    color: ['#00FFFF', '#FFAD00'], //
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
        return params.reduce((rst, cur, i) => {
          return rst + `${cur.marker} 用${cur.seriesName}: ${cur.value} ` + (cur.seriesIndex === 0 ? 't' : 'kwh') + (i === params.length - 1 ? '' : '</br>')
        }, `${params[0].name}</br>`)
      }
    },
    grid: {
      top: '25%',
      left: '8%',
      right: '8%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: 't',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 20, 0, 0]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }, {
        name: 'kwh',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 0, 0, 30]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '水',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(0, 255, 255, 0.5)'},
              {offset: 1, color: 'rgba(0, 255, 255, 0)'}
            ])
          }
        }
      },
      {
        name: '电',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(223, 163, 18, 0.5)'},
              {offset: 1, color: 'rgba(255, 255, 255, 0)'}
            ])
          }
        }
      }
    ]
  },
  {
    color: ['#00FFFF', '#FFAD00'], //
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
        return params.reduce((rst, cur, i) => {
          return rst + `${cur.marker} 用${cur.seriesName}: ${cur.value} ` + (cur.seriesIndex === 0 ? 't' : 'kwh') + (i === params.length - 1 ? '' : '</br>')
        }, `${params[0].name}</br>`)
      }
    },
    grid: {
      top: '25%',
      left: '8%',
      right: '8%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: 't',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 20, 0, 0]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }, {
        name: 'kwh',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 0, 0, 30]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '水',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(0, 255, 255, 0.5)'},
              {offset: 1, color: 'rgba(0, 255, 255, 0)'}
            ])
          }
        }
      },
      {
        name: '电',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(223, 163, 18, 0.5)'},
              {offset: 1, color: 'rgba(255, 255, 255, 0)'}
            ])
          }
        }
      }
    ]
  },
  {
    color: ['#00FFFF', '#FFAD00'], //
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
        return params.reduce((rst, cur, i) => {
          return rst + `${cur.marker} 用${cur.seriesName}: ${cur.value} ` + (cur.seriesIndex === 0 ? 't' : 'kwh') + (i === params.length - 1 ? '' : '</br>')
        }, `${params[0].name}</br>`)
      }
    },
    grid: {
      top: '25%',
      left: '8%',
      right: '8%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: 't',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 20, 0, 0]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }, {
        name: 'kwh',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 0, 0, 30]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '水',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(0, 255, 255, 0.5)'},
              {offset: 1, color: 'rgba(0, 255, 255, 0)'}
            ])
          }
        }
      },
      {
        name: '电',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(223, 163, 18, 0.5)'},
              {offset: 1, color: 'rgba(255, 255, 255, 0)'}
            ])
          }
        }
      }
    ]
  }
]

export const TABLES = [
  {
    pos: [175, 31]
  }, {
    pos: [491, 31]
  }, {
    pos: [806, 31]
  }, {
    pos: [1121, 31]
  }, {
    pos: [29, 358]
  }, {
    pos: [29, 604]
  }, {
    pos: [1210, 358]
  }, {
    pos: [1210, 604]
  }
]

export const TABLES_TYPE_OPTIONS = [
  {
    color: ['#FFAD00'], //
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#d8d8d8'
        }
      },
      padding: 10
    },
    grid: {
      top: '25%',
      left: '10%',
      right: '10%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: 'kwh',
        nameTextStyle: {
          color: '#ffffff',
          padding: [30, 30, 0, 0]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '电',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(223, 163, 18, 0.5)'},
              {offset: 1, color: 'rgba(255, 255, 255, 0)'}
            ])
          }
        }
      }
    ]
  },
  {
    color: ['#00FFFF'], //
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#d8d8d8'
        }
      },
      padding: 10
    },
    grid: {
      top: '25%',
      left: '10%',
      right: '10%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: 't',
        nameTextStyle: {
          color: '#ffffff',
          padding: [0, 20, 0, 0]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          fontSize: 10
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '水',
        symbol: 'circle',
        type: 'line',
        smooth: true,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(0, 255, 255, 0.5)'},
              {offset: 1, color: 'rgba(0, 255, 255, 0)'}
            ])
          }
        }
      }
    ]
  }
]