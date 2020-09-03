<template>
  <div class="asset-stockout">
    <!--<div class="banner"></div>-->
    <e-charts class="charts" ref="line" :options="options"></e-charts>
  </div>
</template>

<script>
  import 'echarts'
  import ECharts from 'vue-echarts/components/ECharts'
  // require('echarts/theme/macarons') // echarts theme
  export default {
    name: 'dash-chart',
    components: {
      ECharts
    },
    props: {
      seriesData: {
        type: Object,
        default: () => ({
          assetsStockinAmountList: [],
          assetsStockoutAmountList: [],
          consumableStockinAmountList: [],
          consumableStockoutAmountList: []
        })
      }
    },
    data() {
      return {
        options: {
          color: ['#00CE74', '#00DCFF', '#FDFE02', '#EB0253'], // []
          legend: {
            top: '8',
            left: '150',
            textStyle: {
              color: '#ffffff',
              fontSize: 15
            },
            icon: 'circle',
            data: ['资产入库', '耗材入库', '资产领用', '耗材领用'] // ['APP用户注册', '芯片生产数']
          },
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
            left: '3%',
            right: '6%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              name: '(月份)',
              nameGap: 1,
              nameTextStyle: {
                padding: [25, 0, 0, 0]
              },
              type: 'category',
              // boundaryGap: false,
              data: [],
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
              name: '(元)',
              nameTextStyle: {
                padding: [0, 35, 0, 0]
              },
              type: 'value',
              minInterval: 1,
              axisLabel: {
                color: '#ffffff'
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
                  color: 'rgba(255,255,255,.6)',
                  type: 'dashed'
                }
              },
            }
          ],
          series: [
            {
              name: '资产入库',
              symbol: 'circle',
              symbolSize: 7,
              type: 'line',
              smooth: false,
              data: []
            },
            {
              name: '耗材入库',
              symbol: 'circle',
              symbolSize: 7,
              type: 'line',
              smooth: false,
              data: []
            },
            {
              name: '资产领用',
              symbol: 'circle',
              symbolSize: 7,
              type: 'line',
              smooth: false,
              data: []
            },
            {
              name: '耗材领用',
              symbol: 'circle',
              symbolSize: 7,
              type: 'line',
              smooth: false,
              data: []
            }
          ]
        }
      }
    },
    methods: {},
    mounted() {
      window.addEventListener('resize', () => {
        this.$refs.line.resize()
      })
    },
    watch: {
      'seriesData.assetsStockinAmountList'() {
        this.options.xAxis[0].data = this.seriesData.assetsStockinAmountList.map(list => Object.keys(list)[0])
        this.options.series[0].data = this.seriesData.assetsStockinAmountList.map(list => list[Object.keys(list)[0]])
      },
      'seriesData.consumableStockinAmountList'() {
        this.options.series[1].data = this.seriesData.consumableStockinAmountList.map(list => list[Object.keys(list)[0]])
      },
      'seriesData.assetsStockoutAmountList'() {
        this.options.series[2].data = this.seriesData.assetsStockoutAmountList.map(list => list[Object.keys(list)[0]])
      },
      'seriesData.consumableStockoutAmountList'() {
        this.options.series[3].data = this.seriesData.consumableStockoutAmountList.map(list => list[Object.keys(list)[0]])
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .charts
    width: 570px
    height: 235px
    margin-left: 10px
</style>
