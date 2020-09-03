<template>
  <e-charts ref="chart" :options="chartOptions" class="chart-box"></e-charts>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "RayLineChart",
    props: {
      chartX: {
        type: Array,
        default: () => ([])
      },
      chartData: {
        type: Array,
        default: () => ([])
      }
    },
    data() {
      return {
        chartOptions: {
          grid: {
            left: 100,
            right: 36,
            top: 40,
            bottom: 40
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // boundaryGap: [0, 0],
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#CCF2FF'
              },
            },
            axisLabel: {
              fontSize: 12,
              margin: 30,
            },
            data: []
          },
          yAxis: {
            nameTextStyle: {
              padding: [0, 0, 5, 60]
            },
            type: 'value',
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(53, 79, 134, 1)'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#CCF2FF'
              }
            },
            axisLabel: {
              inside: false,
              fontSize: 13,
              formatter: '{value}\n',
              margin: 30
            },
          },
          series: [
            {
              name: '出库',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              sampling: 'average',
              itemStyle: {
                color: '#FFF369'
              },
              stack: '数量',
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255, 243, 105, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 243, 105, .05)'
                }])
              },
              data: []
            },
            {
              name: '入库',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              sampling: 'average',
              itemStyle: {
                color: '#48F3FA'
              },
              stack: '数量2',
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(12, 132, 137, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(72, 243, 250, .05)'
                }])
              },
              data: []
            },

          ]
        }
      }
    },
    watch: {
      'chartData' (val) {
        console.log(val, 'val')
        this.chartOptions.series[0].data = val[0]
        this.chartOptions.series[1].data = val[1]
      },
      'chartX' (val) {
        this.chartOptions.xAxis.data = val
      }
    }
  }
</script>

<style lang="sass" scoped>
  .chart-box
    width: 100%
    height: 100%
</style>