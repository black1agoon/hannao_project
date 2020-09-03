// import echarts from 'vue-echarts/dist/vue-echarts'
export const ONOFF = {
  REGIONS: {
    north: {},
    south: {}
  },
  CHARTS: {
    color: ['#F6B37F'], //
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      icon: 'circle',
      textStyle: {
        color: '#000000',
        fontSize: 15
      },
      right: '5%',
      top: 20
    },
    grid: {
      top: '10%',
      left: '10%',
      right: '10%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        name: '',
        nameTextStyle: {
          color: '#000000',
          padding: [30, 0, 0, 0]
        },
        type: 'category',
        // boundaryGap: false,
        data: [],
        axisLabel: {
          textStyle: {
            color: '#000000',
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(14,95,183,.5)'
          },
          symbol: ['none', 'arrow']
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: '状态',
        max: 2,
        nameTextStyle: {
          color: '#000000',
          fontSize: 15,
          padding: [0, 20, 10, 0]
        },
        type: 'value',
        minInterval: 1,
        axisLabel: {
          textStyle: {
            color: '#000000',
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(14,95,183,.5)'
          },
          symbol: ['none', 'arrow']
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
    series: []
  }
}