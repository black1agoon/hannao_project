import echarts from 'vue-echarts/dist/vue-echarts'
export const BOARD = {
  BLOCKS: [
    {
      name: '路灯杆',
      value: 'lightCount',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: '/static/img/dashboard/charts1.svg',
      introduce: ''
    }, {
      name: '电表',
      value: 'electricCount',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: '/static/img/dashboard/charts2.svg',
      introduce: ''
    }, {
      name: '充电桩',
      value: 'pileCount',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: '/static/img/dashboard/charts3.svg',
      introduce: ''
    }, {
      name: '音频数',
      value: 'musicCount',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: '/static/img/dashboard/charts4.svg',
      introduce: ''
    }
  ],
  PIE_OPTIONS: {
    color: ['#D5D5D5', '#975FE4'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      show: false,
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 20,  // 设置宽度
      itemHeight: 20, // 设置高度
      right: '0',
      top: 'center',
      data: ['离线', '在线']
    },
    series: [
      {
        name: '电表状态',
        type: 'pie',
        // roseType: 'radius',
        radius: ['50%', '70%'],
        center: ['30%', '50%'],
        data: [0, 0],
        // animationEasing: 'cubicInOut',
        animationDuration: 1000,
        label: {
          formatter: '{d}%'
        }
      }
    ]
  },
  PIE_OPTIONS2: {
    color: ['#D5D5D5', '#11C1C1'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      show: false,
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 20,  // 设置宽度
      itemHeight: 20, // 设置高度
      right: '0',
      top: 'center',
      data: ['离线', '在线']
    },
    series: [
      {
        name: '充电桩状态',
        type: 'pie',
        // roseType: 'radius',
        radius: ['50%', '70%'],
        center: ['30%', '50%'],
        data: [0, 0],
        // animationEasing: 'cubicInOut',
        animationDuration: 1000,
        label: {
          formatter: '{d}%'
        }
      }
    ]
  },
  PIE_OPTIONS3: {
    color: ['#D5D5D5', '#5AB1EF'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      show: false,
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 20,  // 设置宽度
      itemHeight: 20, // 设置高度
      right: '0',
      top: 'center',
      data: ['离线', '在线']
    },
    series: [
      {
        name: '音频状态',
        type: 'pie',
        // roseType: 'radius',
        radius: ['50%', '70%'],
        center: ['30%', '50%'],
        data: [0, 0],
        // animationEasing: 'cubicInOut',
        animationDuration: 1000,
        label: {
          formatter: '{d}%'
        }
      }
    ]
  },
  LINE_OPTIONS: {
    color: ['#975FE4'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#d8d8d8'
        }
      },
      padding: 10,
      formatter: '{a} <br/>{b} : {c}KW·h'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
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
        name: 'KW·h',
        nameTextStyle: {
          color: '#606266'
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
        name: '当日用电',
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
    color: ['#11C1C1'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#d8d8d8'
        }
      },
      padding: 10,
      formatter: '{a} <br/>{b} : {c}KW·h'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
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
        name: 'KW·h',
        nameTextStyle: {
          color: '#606266'
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
        name: '当日用电',
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

