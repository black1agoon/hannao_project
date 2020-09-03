<template>
  <eui-window ref="window"
              :options="windowOptions">
    <div class="search-wrapper">
      <span class="label">年份选择:</span>
      <eui-input
          ref="input"
          class="input"
          type="select"
          @change="yearChange"
          v-model="currentYear"
          :options="getYearOptions">
      </eui-input>
    </div>
    <div class="line-wrapper">
      <charts-temp :options="lineOptions">
      </charts-temp>
    </div>
    <div slot="btns">
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import ChartsTemp from '@/app/tools/ChartsTemp'
  import api from '@/api'

  export default {
    name: 'electric-year-window',
    components: {
      EuiWindow,
      EuiInput,
      ChartsTemp
    },
    computed: {
      getYearOptions() {
        let date = new Date()
        let year = date.getFullYear()
        return Array.from({length: 3}, (v, i) => ({
          label: year - i,
          value: year - i
        }))
      }
    },
    data() {
      return {
        currentYear: null,
        query: {
          equipmentId: null,
          year: null
        },
        windowOptions: {
          title: '年耗电量',
          width: '70%'
        },
        lineOptions: {
          title: {
            text: '',
            left: 'center',
            textStyle: {
              color: '#333'
            }
          },
          color: ['#00CE74'], // []
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
              return `日期: ${params[0].axisValue}<br>${params[0].seriesName}: ${params[0].value}kW‧h`
            }
          },
          grid: {
            left: '3%',
            right: '6%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              name: '日期/月',
              nameGap: 1,
              nameTextStyle: {
                padding: [25, 0, 0, 0]
              },
              type: 'category',
              // boundaryGap: false,
              data: [],
              axisLine: {
                lineStyle: {
                  color: '#333'
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
              name: '耗电/kW‧h',
              nameTextStyle: {
                padding: [0, 35, 0, 0]
              },
              type: 'value',
              minInterval: 1,
              axisLabel: {
                color: '#333'
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#333'
                },
                symbol: ['none', 'arrow']
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
              name: '耗电',
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
    methods: {
      open(id) {
        this.query.equipmentId = id
        this.query.year = this.currentYear
        // this.$refs.window.open()
        this.getData().then(() => {
          this.$refs.window.open()
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getData() {
        return api.electric.yearEvery(this.query).then((data) => {
          this.lineOptions.title.text = this.currentYear + '年耗电量'
          this.lineOptions.xAxis[0].data = data[0].data.map(v => v.month)
          this.lineOptions.series[0].data = data[0].data.map(v => v.value)
        })
      },
      yearChange() {
        this.query.year = this.currentYear
        this.getData()
      }
    },
    mounted() {
      let date = new Date()
      this.currentYear = date.getFullYear()
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .search-wrapper
    height: 40px
    line-height: 40px
    font-size: 13px
    border-bottom: 1px solid #eee
    .label
      margin: 0 20px
    .input
      display: inline-block
      width: 150px

  .line-wrapper
    height: 500px
</style>