<template>
  <eui-window ref="window"
              :options="windowOptions">
    <div class="search-wrapper">
      <span class="label">月份选择:</span>
      <eui-input
          ref="input"
          class="input"
          type="select"
          @change="monthChange"
          v-model="currentMonth"
          :options="getMonthOptions">
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
    name: 'electric-month-window',
    components: {
      EuiWindow,
      EuiInput,
      ChartsTemp
    },
    computed: {
      yearMonth() {
        let date = new Date()
        let year = date.getFullYear()
        return year + '-' + this.currentMonth
      },
      getMonthOptions() {
        let date = new Date()
        let month = date.getMonth() + 1
        return this.monthOptions.filter(m => m.index <= month)
      }
    },
    data() {
      return {
        currentMonth: null,
        query: {
          equipmentId: null,
          month: null
        },
        windowOptions: {
          title: '月耗电量',
          width: '70%'
        },
        monthOptions: [
          {
            label: '一月',
            value: '01',
            index: 1
          }, {
            label: '二月',
            value: '02',
            index: 2
          }, {
            label: '三月',
            value: '03',
            index: 3
          }, {
            label: '四月',
            value: '04',
            index: 4
          }, {
            label: '五月',
            value: '05',
            index: 5
          }, {
            label: '六月',
            value: '06',
            index: 6
          }, {
            label: '七月',
            value: '07',
            index: 7
          }, {
            label: '八月',
            value: '08',
            index: 8
          }, {
            label: '九月',
            value: '09',
            index: 9
          }, {
            label: '十月',
            value: '10',
            index: 10
          }, {
            label: '十一月',
            value: '11',
            index: 11
          }, {
            label: '十二月',
            value: '12',
            index: 12
          }],
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
              return `日期: ${this.currentMonth}-${params[0].axisValue}<br>${params[0].seriesName}: ${params[0].value}kW‧h`
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
              name: '日期/日',
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
        this.query.month = this.yearMonth
        this.getData().then(() => {
          this.$refs.window.open()
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getData() {
        return api.electric.monthEvery(this.query).then((data) => {
          this.lineOptions.title.text = this.monthOptions.find(m => m.value === this.currentMonth).label + '耗电量'
          this.lineOptions.xAxis[0].data = data[0].data.map(v => v.date.substr(8))
          this.lineOptions.series[0].data = data[0].data.map(v => v.value)
        })
      },
      monthChange() {
        this.query.month = this.yearMonth
        this.getData()
      }
    },
    mounted() {
      let date = new Date()
      let month = date.getMonth() + 1 + ''
      this.currentMonth = ('00' + month).substr(month.length)
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