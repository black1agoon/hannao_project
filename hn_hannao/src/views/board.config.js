import echarts from 'vue-echarts/dist/vue-echarts'

export const INDUSTRY = {
  color: ['#00EBD8'],
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
    left: '3%',
    right: '5%',
    bottom: '5%',
    containLabel: true
  },
  legend: {
    // icon: 'circle',
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
        padding: [30, 10, 10, 0]
      },
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLabel: {
        textStyle: {
          fontSize: 15,
          color: '#ffffff'
        },
        padding: [6, 0, 0, 20]
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
      name: '（数量）',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 15,
        padding: [0, 40, 10, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          fontSize: 15,
          color: '#ffffff'
        }
      },
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
        show: true,
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
      name: '数量',
      symbol: 'circle',
      type: 'line',
      smooth: true,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(0,235,216,0.48)'},
            {offset: 1, color: 'rgba(0,255,255,0)'}
          ])
        }
      }
    }
  ]
}

export const ANTIFAKE = {
  color: ['#FF7123', '#0BF558'],
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
    bottom: '5%',
    containLabel: true
  },
  legend: {
    // icon: 'circle',
    textStyle: {
      color: '#ffffff',
      fontSize: 17
    },
    right: '5%',
    top: 30
  },
  xAxis: [
    {
      name: '(月份)',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 22,
        padding: [10, 10, 20, 30]
      },
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLabel: {
        textStyle: {
          fontSize: 22,
          color: '#ffffff'
        },
        padding: [6, 0, 0, 20]
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
      name: '(数量)',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 22,
        padding: [0, 40, 10, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          fontSize: 22,
          color: '#ffffff'
        }
      },
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
        show: true,
        lineStyle: {
          type: 'solid',
          color: ['rgba(255, 255, 255, .3)']
        }
      },
      splitArea: {
        show: false
      }
    },
    {
      name: '(数量)',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 22,
        padding: [0, 40, 10, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          fontSize: 22,
          color: '#ffffff'
        }
      },
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
        show: false,
        lineStyle: {
          type: 'solid',
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
      name: '标识数',
      symbol: 'circle',
      type: 'line',
      smooth: false,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(255,113,35,.5)'},
            {offset: 1, color: 'rgba(2,45,154,.1)'}
          ])
        }
      }
    },
    {
      name: '用户数',
      symbol: 'circle',
      type: 'line',
      smooth: false,
      yAxisIndex: 1,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(11,245,88,.5)'},
            {offset: 1, color: 'rgba(2,45,154,.1)'}
          ])
        }
      }
    }
  ]
}

export const PROMANGE = {
  color: ['#65FEB8', '#FF9A23'],
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
    right: '8%',
    bottom: '5%',
    containLabel: true
  },
  legend: {
    // icon: 'circle',
    textStyle: {
      color: '#ffffff',
      fontSize: 17
    },
    right: '5%',
    top: 30
  },
  xAxis: [
    {
      name: '(月份)',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 22,
        padding: [10, 10, 20, 30]
      },
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLabel: {
        textStyle: {
          fontSize: 22,
          color: '#ffffff'
        },
        padding: [6, 0, 0, 20]
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
      name: '(数量)',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 22,
        padding: [0, 40, 10, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          fontSize: 22,
          color: '#ffffff'
        }
      },
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
        show: true,
        lineStyle: {
          type: 'solid',
          color: ['rgba(255, 255, 255, .3)']
        }
      },
      splitArea: {
        show: false
      }
    },
    {
      name: '(数量)',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 22,
        padding: [0, 40, 10, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          fontSize: 22,
          color: '#ffffff'
        }
      },
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
        show: false,
        lineStyle: {
          type: 'solid',
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
      name: '标识解析请求',
      symbol: 'circle',
      type: 'line',
      smooth: false,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(91, 231, 179, 0.5)'},
            {offset: 1, color: 'rgba(2,45,154,.1)'}
          ])
        }
      }
    },
    {
      name: '标识使用量',
      symbol: 'circle',
      type: 'line',
      smooth: false,
      yAxisIndex: 1,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(255, 154, 35,.5)'},
            {offset: 1, color: 'rgba(2,45,154,.1)'}
          ])
        }
      }
    }
  ]
}

export const EDGE = {
  color: ['#00EBD8'],
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
  xAxis: [
    {
      name: '',
      nameTextStyle: {
        color: '#ffffff',
        padding: [30, 10, 10, 0]
      },
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLabel: {
        textStyle: {
          fontSize: 15,
          color: '#ffffff'
        },
        padding: [6, 0, 0, 20]
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
      name: '（数量）',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 15,
        padding: [0, 40, 10, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          fontSize: 15,
          color: '#ffffff'
        }
      },
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
        show: true,
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
      name: '数量',
      symbol: 'circle',
      type: 'line',
      smooth: true,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(0,235,216,0.48)'},
            {offset: 1, color: 'rgba(0,255,255,0)'}
          ])
        }
      }
    }
  ]
}

export const COMPANY_RAKE = {
  color: ['#E66A02', '#44C885'],
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
    top: '10',
    right: '20',
    data: ['设备', '人员'],
    textStyle: {
      color: '#CBF6FF'
    }
  },
  grid: {
    top: '25%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: [
    {
      name: '',
      nameTextStyle: {
        color: '#ffffff',
        padding: [30, 10, 10, 0]
      },
      type: 'category',
      boundaryGap: true,
      data: [],
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#CBF6FF'
        },
        padding: [6, 0, 0, 0],
        interval: 0
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      name: '',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 15,
        padding: [0, 40, 10, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#CBF6FF'
        },
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
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
      name: '设备',
      type: 'bar',
      barWidth: 10,
      barGap: '100%', // 间隔 相当于 bar的宽度
      data: []
    },
    {
      name: '人员',
      type: 'bar',
      barWidth: 10,
      data: []
    }
  ]
}

export const CODE_ADD = {
  color: ['#44C885'],
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
    top: '10%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: [
    {
      name: '',
      nameTextStyle: {
        color: '#ffffff',
        padding: [30, 10, 10, 0]
      },
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#CBF6FF'
        },
        padding: [6, 0, 0, 20],
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      name: '',
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 15,
        padding: [0, 40, 10, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#ffffff'
        },
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
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
      type: 'line',
      symbol: 'circle',
      symbolSize: 0,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(68, 200, 133, 0.2)'},
            {offset: 1, color: 'rgba(203, 246, 255, 0.1)'}
          ])
        }
      },
      lineStyle: {
        width: 3
      }
    }
  ]
}

export const OPEN_RATE = {
  color: ['#E66A02', '#FFD500', '#44C885'],
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
    top: '10',
    right: '20',
    data: ['边缘设备', '过程计算', '设备产品'],
    textStyle: {
      color: '#ffffff'
    }
  },
  grid: {
    top: '10%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: [
    {
      name: '',
      nameTextStyle: {
        color: '#CBF6FF',
        padding: [10, 10, 10, 0]
      },
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#CBF6FF'
        },
        padding: [6, 0, 0, 20],
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      name: '%',
      // max: 100,
      nameTextStyle: {
        color: '#ffffff',
        fontSize: 12,
        padding: [0, 40, 0, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#ffffff'
        },
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
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
      name: '边缘设备',
      type: 'line',
      symbol: 'circle',
      symbolSize: 0,
      data: [],
      lineStyle: {
        width: 3
      }
    },
    {
      name: '过程计算',
      type: 'line',
      symbol: 'circle',
      symbolSize: 0,
      data: [],
      lineStyle: {
        width: 3
      }
    },
    {
      name: '设备产品',
      type: 'line',
      symbol: 'circle',
      symbolSize: 0,
      data: [],
      lineStyle: {
        width: 3
      }
    }
  ]
}

export const LABEL_PRODUCT = {
  color: ['#0096FF'],
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
    top: '5%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: [
    {
      name: '',
      nameTextStyle: {
        color: '#ffffff',
        padding: [10, 0, 10, 0]
      },
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#CBF6FF'
        },
        padding: [6, 0, 0, 20],
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      nameTextStyle: {
        color: '#CBF6FF',
        fontSize: 12,
        padding: [0, 10, 10, 0]
      },
      type: 'value',
      minInterval: 1,
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#CBF6FF'
        },
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
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
      type: 'line',
      symbol: 'circle',
      symbolSize: 0,
      data: [],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(68, 200, 133, 0.2)'},
            {offset: 1, color: 'rgba(203, 246, 255, 0.1)'}
          ])
        }
      },
      lineStyle: {
        width: 3
      }
    }
  ]
}

export const CARD_TYPE = {
  color: ['#0096FF', '#44C885', '#E66A02', '#5FC1EE'],
  legend: {
    show: true,
    orient: 'horizontal',
    icon: 'circle',
    itemGap: 50,
    itemWidth: 14,  // 设置宽度
    itemHeight: 14, // 设置高度
    bottom: 0,
    left: 0,
    data: [],
    textStyle: {
      color: '#ffffff'
    },
    padding: [20, 0, 0, 0]
  },
  series: [
    {
      name: '',
      type: 'pie',
      // roseType: 'radius',
      radius: ['35%', '70%'],
      center: ['40%', '50%'],
      data: [],
      // animationEasing: 'cubicInOut',
      // animationDuration: 1000,
      label: {
        formatter: '{d}%',
        fontSize: '22',
        fontWeight: 'bold'
      },
      labelLine: {
        length: 5,
        length2: 50,
        lineStyle: {
          width: 2
        }
      }
    }
  ]
}