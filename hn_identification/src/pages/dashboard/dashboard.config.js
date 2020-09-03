import echarts from 'vue-echarts/dist/vue-echarts'
export const HOME = {
  PIE_OPTIONS: {
    title: ['人员分析', '设备开机率'],
    options: {
      tooltip: {
        trigger: 'item', // '{b} : {c}<br> 占比: {d}%'
        backgroundColor: 'rgba(255, 255, 255, 1)',
        formatter: (params) => {
          return `<span style="color: #161616;margin-right: 10px;vertical-align: top">${params.name}</span><span style="color: ${params.color};font-size: 28px">${params.value}</span><br><span style="color: #161616;margin-right: 10px;vertical-align: top">占比</span> <span style="color: #A3A3A3;font-size: 28px;">${params.percent}%</span>`
        }
      },
      legend: {
        show: false,
        orient: 'vertical',
        icon: 'circle',
        itemWidth: 20,  // 设置宽度
        itemHeight: 20, // 设置高度
        right: '5%',
        top: 'center',
        data: []
      },
      series: [
        {
          name: '',
          type: 'pie',
          // roseType: 'radius',
          radius: ['45%', '70%'],
          center: ['40%', '50%'],
          data: [],
          // animationEasing: 'cubicInOut',
          animationDuration: 1000
        }
      ]
    }
  },
  ACTIVE_LINE_OPTIONS: {
    color: ['#70A4F2', '#9F55EA'],
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
      right: '100',
      data: []
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        name: '日期',
        nameTextStyle: {
          color: '#606266',
          padding: [30, 0, 0, 0]
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
        name: '开机率(%)',
        nameTextStyle: {
          color: '#606266',
          padding: [0, 30, 0, 0]
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
    series: []
  },
  TABLE_OPTIONS: {
    title: '数量统计',
    showSeq: false,
    data: [],
    currentPage: 1,
    total: 0,
    columns: []
  },
  LINE_OPTIONS: {
    title: '日增长量',
    tabList: ['周', '月', '年'],
    options: {
      color: ['#70A4F2', '#9F55EA'],
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
        right: '100',
        data: ['企业', '人员']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          name: '日期',
          nameTextStyle: {
            color: '#606266',
            padding: [30, 0, 0, 0]
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
          name: '数量(企业)',
          nameTextStyle: {
            color: '#606266',
            padding: [0, 30, 0, 0]
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
        },
        {
          name: '数量(人员)',
          nameTextStyle: {
            color: '#606266',
            padding: [0, 0, 0, 30]
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
          name: '企业',
          symbol: 'circle',
          type: 'line',
          smooth: true,
          data: [],
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgba(112, 164, 242, 0.61)'},
                {offset: 1, color: 'rgba(112, 164, 242, 0)'}
              ])
            }
          }
        },
        {
          name: '人员',
          symbol: 'circle',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: [],
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgba(159, 85, 234, 0.45)'},
                {offset: 1, color: 'rgba(159, 85, 234, 0)'}
              ])
            }
          }
        }
      ]
    }
  },
  LINE2_OPTIONS: {
    title: '主动码日增长量',
    tabList: ['周', '月', '年'],
    options: {
      color: ['#E9687C'],
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
        show: false,
        top: '10',
        right: '100',
        data: []
      },
      grid: {
        left: '3%',
        right: '7%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          name: '日期',
          nameTextStyle: {
            color: '#606266',
            padding: [30, 0, 0, 0]
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
          name: '数量',
          nameTextStyle: {
            color: '#606266',
            padding: [0, 30, 0, 0]
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
          name: '数量',
          symbol: 'circle',
          type: 'line',
          smooth: true,
          data: [],
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgba(233, 105, 124, 0.68)'},
                {offset: 1, color: 'rgba(254, 182, 133, 0.1)'}
              ])
            }
          }
        }
      ]
    }
  }
}


