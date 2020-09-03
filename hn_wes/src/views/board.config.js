import echarts from 'vue-echarts/dist/vue-echarts'

export const CLASSIFICATION = {
  color: ['#F6B37F'], //
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    top: '20%',
    left: '10%',
    right: '10%',
    bottom: '4%',
    containLabel: true
  },
  xAxis: [
    {
      name: '',
      nameTextStyle: {
        color: '#ffffff',
        padding: [30, 0, 0, 0]
      },
      type: 'category',
      // boundaryGap: false,
      data: [],
      axisLabel: {
        textStyle: {
          color: '#ffffff',
          fontSize: 12
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(14,95,183,.5)'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      name: '数量',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 15,
        padding: [0, 20, 10, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          color: '#ffffff',
          fontSize: 12
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(14,95,183,.5)'
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
      name: '数量',
      symbol: 'circle',
      type: 'bar',
      barWidth: 22,
      // smooth: false,
      data: [],
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 1, color: 'rgba(19,34,84,0.5)'},
            {offset: 0, color: 'rgba(167,24,252,1)'}
          ])
        }
      }
    }
  ]
}

export const RECORD = {
  color: ['rgba(255, 173, 0, 1)', 'rgba(0, 183, 255, 1)'],
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
    left: '5%',
    right: '5%',
    bottom: '5%',
    containLabel: true
  },
  legend: {
    icon: 'circle',
    textStyle: {
      color: '#ffffff',
      fontSize: 15
    },
    right: '5%',
    top: 20
  },
  xAxis: [
    {
      name: '',
      nameTextStyle: {
        color: '#ffffff',
        padding: [30, 0, 0, 0]
      },
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLabel: {
        textStyle: {
          color: '#ffffff',
          fontSize: 12
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(14,95,183,.5)'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      name: '数量',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 14,
        padding: [0, 20, 10, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          color: '#ffffff',
          fontSize: 12
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(14,95,183,.5)'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
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
      name: '出库',
      symbol: 'circle',
      type: 'line',
      smooth: false,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(255, 173, 0, 0.6)'},
            {offset: 1, color: 'rgba(255, 173, 0, 0.01)'}
          ])
        }
      }
    },
    {
      name: '入库',
      symbol: 'circle',
      type: 'line',
      smooth: false,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(0, 183, 255, .6)'},
            {offset: 1, color: 'rgba(255, 173, 0, 0.01)'}
          ])
        }
      }
    }
  ]
}

export const WORKSHOP = {
  color: ['#EBD40B', '#D05908', '#00F9FA'],
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
    left: '5%',
    right: '5%',
    bottom: '5%',
    containLabel: true
  },
  legend: {
    icon: 'circle',
    textStyle: {
      color: '#ffffff',
      fontSize: 17
    },
    right: '5%',
    top: 30
  },
  xAxis: [
    {
      name: '',
      nameTextStyle: {
        color: '#ffffff',
        padding: [30, 0, 0, 0]
      },
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#ffffff'
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(14,95,183,.5)'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      name: '数量',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 14,
        padding: [0, 20, 10, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#ffffff'
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(14,95,183,.5)'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
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
            {offset: 0, color: 'rgba(255,222,0,0.48)'},
            {offset: 1, color: 'rgba(7,8,81,0.29)'}
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
            {offset: 0, color: 'rgba(235,97,0,0.48)'},
            {offset: 1, color: 'rgba(7,8,81,0.29)'}
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
            {offset: 0, color: 'rgba(0,235,216,0.48)'},
            {offset: 1, color: 'rgba(255, 173, 0, 0.01)'}
          ])
        }
      }
    }
  ]
}

export const MAIN = {
  LINE_BAR: {
    color: ['#656DD3', '#07FDEC'],
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
    legend: {
      show: true,
      top: '10',
      right: '10',
      data: ['合格率', '产量'],
      textStyle: {
        color: '#81D5E5'
      }
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        // boundaryGap: false,
        data: [],
        axisLabel: {
          color: '#81D5E5'
        },
        axisLine: {
          lineStyle: {
            color: '#4D7A9E'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        minInterval: 1,
        axisLabel: {
          color: '#81D5E5'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitArea: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#4D7A9E'
          }
        }
      },
      {
        type: 'value',
        minInterval: 1,
        axisLabel: {
          color: '#81D5E5'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#4D7A9E'
          }
        }
      }
    ],
    series: [
      {
        name: '合格率',
        symbol: 'line',
        type: 'line',
        smooth: false,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(89,99,197,0.1)'},
              {offset: 1, color: 'rgba(89,99,197,0.4)'}
            ])
          }
        }
      },
      {
        name: '产量',
        barWidth: 16,
        type: 'bar',
        yAxisIndex: 1,
        data: [],
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(7,253,236,1)'},
              {offset: 1, color: 'rgba(2,153,253,1)'}
            ])
          }
        }
      }
    ]
  },
  LINE_OPTIONS: {
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
    legend: {
      show: true,
      top: '10',
      right: '10',
      data: [],
      textStyle: {
        color: '#81D5E5'
      }
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        // boundaryGap: false,
        data: [],
        axisLabel: {
          color: '#81D5E5'
        },
        axisLine: {
          lineStyle: {
            color: '#4D7A9E'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        minInterval: 1,
        axisLabel: {
          color: '#81D5E5'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitArea: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#4D7A9E'
          }
        }
      }
    ],
    series: []
  },
  PIE_OPTIONS: {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    color: ['#02A9FA', '#FF5D75', '#012D45'],
    legend: {
      show: false,
      right: 0,
      top: 'center',
      itemGap: 20,
      icon: 'square',
      data: ['运行中设备', '故障设备', '未开机设备'],
      textStyle: {
        color: '#81D5E5'
      }
    },
    series: [
      {
        name: '设备',
        type: 'pie',
        radius: ['60%', '70%'],
        center: ['20%', '50%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {value: 0, name: '运行中设备'},
          {value: 0, name: '故障设备'},
          {value: 0, name: '未开机设备'}
        ]
      }
    ]
  }
}

export const BACKSHOP = {
  LINE_OPTIONS: {
    color: ['#A9EEFB', '#3D4B70'],
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
    legend: {
      show: true,
      top: 50,
      right: 130,
      itemGap: 50,
      data: ['本月', '上月单日平均'],
      textStyle: {
        color: '#A9EEFB',
        fontSize: 21
      }
    },
    grid: {
      top: 80,
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        // boundaryGap: false,
        data: [],
        axisLabel: {
          color: '#A9EEFB',
          fontSize: 24
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#4D7A9E'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        minInterval: 1,
        axisLabel: {
          color: '#A9EEFB',
          fontSize: 24
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#4D7A9E',

          }
        }
      }
    ],
    series: [
      {
        name: '本月',
        type: 'line',
        symbol: 'line',
        smooth: false,
        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(169, 238, 251, 0.2)'},
              {offset: 1, color: 'rgba(169, 238, 251, 0)'}
            ])
          }
        }
      },
      {
        name: '上月单日平均',
        type: 'line',
        symbol: 'line',
        smooth: false,
        data: []
      }
    ]
  },
  PIE_OPTIONS: {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {d}%'
    },
    color: ['rgba(75, 250, 231, 1)', 'rgba(255, 255, 255, 0.2)'],
    legend: {
      show: false,
      right: 0,
      top: 'center',
      itemGap: 20,
      icon: 'square',
      data: ['合格', '不合格'],
      textStyle: {
        color: '#81D5E5'
      }
    },
    series: [
      {
        name: '合格率',
        type: 'pie',
        radius: ['60%', '100%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 0,
            name: '合格',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 1, color: 'rgba(255, 255, 255, 0.2)'
                }],
                globalCoord: true // 缺省为 false
              }
            }
          }, {
            value: 0,
            name: '不合格',
            itemStyle: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          }
        ]
      }
    ]
  }
}
