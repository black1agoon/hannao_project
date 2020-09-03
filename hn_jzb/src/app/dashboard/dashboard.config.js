// import echarts from 'vue-echarts/dist/vue-echarts'
import echarts from 'echarts/lib/echarts'
import config from '@/config'
export const BOARD0 = {
  BLOCKS: [
    {
      name: '设备',
      value: 'equiment',
      unit: '台',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Chart3.svg',
      introduce: '平台总共/今日新增接入的设备数，指加密机数量。'
    }, {
      name: '标签',
      value: 'card',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Chart4.svg',
      introduce: '平台总共/今日新增的芯片和条码的总数。'
    }, {
      name: '企业',
      value: 'company',
      unit: '家',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Chart5.svg',
      introduce: '平台总共/今日新增认证通过的企业数。'
    }, {
      name: 'APP用户',
      value: 'mssUser',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Line2.svg',
      introduce: '平台总共/今日新增的APP注册用户数。'
    }, {
      name: '产品',
      value: 'product',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Line3.svg',
      introduce: '平台总共/今天新增的产品数量。'
    }
  ],
  MAP_OPTIONS: {
    title: '设备地图分布'
  },
  TABLE_OPTIONS: {
    title: '',
    showSeq: true,
    tabList: ['标签数', '产品数'],
    data: [],
    currentPage: 1,
    total: 0,
    columns: []
  },
  PIE_OPTIONS: {
    title: '',
    tabList: ['商品类型', '标签类型'],
    options: {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        icon: 'circle',
        itemWidth: 20,  // 设置宽度
        itemHeight: 20, // 设置高度
        right: '0',
        top: 'center',
        data: []
      },
      series: [
        {
          name: '',
          type: 'pie',
          // roseType: 'radius',
          radius: ['40%', '60%'],
          center: ['40%', '50%'],
          data: [],
          // animationEasing: 'cubicInOut',
          animationDuration: 1000
        }
      ]
    }
  },
  LINE_OPTIONS: {
    title: '数据分析',
    tabList: ['全部', 'APP用户注册', '芯片生产数'],
    options: {
      color: [], // ['#975FE4', '#11C1C1']
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
        top: '8',
        left: '150',
        data: [] // ['APP用户注册', '芯片生产数']
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
          name: 'APP用户注册',
          symbol: 'circle',
          type: 'line',
          smooth: false,
          data: [],
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#975FE4'},
                {offset: 1, color: '#ffffff'}
              ])
            }
          }
        },
        {
          name: '芯片生产数',
          symbol: 'circle',
          type: 'line',
          smooth: false,
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
}
export const BOARD1 = {
  BLOCKS: [
    {
      name: '设备',
      value: 'equiment',
      unit: '台',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Chart2.svg',
      introduce: '平台总共/今日新增接入的设备数，指加密机数量。'
    }, {
      name: '标签',
      value: 'card',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Chart1.svg',
      introduce: '平台总共/今日新增的芯片和条码的总数。'
    }, {
      name: '产品',
      value: 'product',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Line1.svg',
      introduce: '平台总共/今天新增的产品数量。'
    }
  ],
  TABLE1_OPTIONS: {
    title: '',
    data: [],
    showSeq: true,
    tabList: ['标签数', '产品数'],
    total: 0,
    currentPage: 1,
    columns: []
  },
  TABLE2_OPTIONS: {
    title: '到期企业列表',
    data: [],
    total: 0,
    columns: [
      {prop: 'companyName', label: '企业名称', width: 230},
      {prop: 'typeName', label: '所属行业', align: 'center'}
    ]
  },
  PIE_OPTIONS: {
    title: '',
    tabList: ['商品类型', '标签类型'],
    options: {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        icon: 'circle',
        itemWidth: 20,  // 设置宽度
        itemHeight: 20, // 设置高度
        right: '0',
        top: 'center',
        data: []
      },
      series: [
        {
          name: '',
          type: 'pie',
          // roseType: 'radius',
          radius: ['40%', '60%'],
          center: ['40%', '50%'],
          data: [],
          // animationEasing: 'cubicInOut',
          animationDuration: 1000
        }
      ]
    }
  },
  LINE_OPTIONS: {
    title: '数据分析',
    options: {
      color: ['#975FE4'],
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
        top: '8',
        left: '150',
        data: ['芯片生产数']
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
          name: '芯片生产数',
          symbol: 'circle',
          type: 'line',
          stack: '总量',
          smooth: false,
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
    }
  }
}

export const COMPANYBOARD = {
  BLOCKS: [
    {
      name: '设备',
      value: 'equipment',
      unit: '台',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Chart3.svg',
      introduce: '企业总共/今日新增接入的设备数，指加密机数量。'
    }, {
      showToday: false,
      updateTime: null,
      name: '停机',
      value: 'equipmentStop',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Chart4.svg',
      introduce: '企业当前时间停机的数量。'
    }, {
      name: '标签',
      value: 'card',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Chart5.svg',
      introduce: '企业总共/今日新增的芯片和条码的总数。'
    }, {
      name: '生产',
      value: 'cardUsed',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Line2.svg',
      introduce: '企业总共/今日新增生产的产品数。'
    }, {
      name: '产品',
      value: 'product',
      unit: '个',
      count: null,
      todayAdd: null,
      bgImage: config.pacPrev + '/static/img/dashboard/Line3.svg',
      introduce: '企业总共/今天新增的产品数量。'
    }
  ],
  LINE_OPTIONS: {
    title: '数据分析',
    options: {
      color: ['#975FE4'],
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
        top: '13',
        left: '150',
        data: ['芯片生产数']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '20%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          // boundaryGap: false,
          data: [],
          axisLabel: {
            color: '#606266',
            margin: 25
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
          name: '芯片生产数',
          symbol: 'circle',
          type: 'line',
          stack: '总量',
          smooth: false,
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
    }
  },
  TABLE_OPTIONS: {
    title: '产品标签查看排名',
    data: [],
    total: 0,
    showSeq: true,
    columns: [
      {prop: 'name', label: '产品名称', width: 230},
      {prop: 'productNo', label: '产品编号', align: 'center'},
      {prop: 'viewtimes', label: '查看次数', align: 'center'}
    ]
  }
}

