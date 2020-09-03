<template>
  <eui-window ref="window">
    <div class="title" slot="title">当天产量</div>
    <div class="content">
      <dash-chart ref="echart"
                  class="charts"
                  :options="lineOptions">
      </dash-chart>
      <div class="user-total">
        <div class="user" v-for="(user, index) in tooltips" :key="index">
          <i class="icon" :style="{background: COLOR[index]}"></i>
          <span class="name">{{user.name}}</span>
          <span class="num">{{user.total}}</span>
        </div>
      </div>
      <div class="day-wrapper">
        <time-line
          ref="timeline"
          @dispatch="getEchartsData"
          :start-time="startTime"
          :end-time="endTime">
        </time-line>
      </div>
    </div>
    <div slot="btns">
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import DashChart from '../../tools/DashChart'
  import echarts from 'vue-echarts/dist/vue-echarts'
  import TimeLine from '../common/TimeLine'
  const COLOR = ['#11C1C1', '#975FE4', '#51a1fa', '#E45A76']
  export default {
    name: 'today-output-window',
    components: {
      EuiLayout,
      EuiWindow,
      EuiTable,
      DashChart,
      TimeLine
    },
    props: {
      startTime: String,
      endTime: String
    },
    data() {
      return {
        COLOR,
        params: {
          date: null,
          stationCode: null,
          orderId: null
        },
        tooltips: [],
        lineOptions: {
          color: COLOR, //
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
              return `${params[0].seriesName}: ${params[0].name}时 ${params[0].marker}</br> 产量:  ${params[0].value[1]}双`
            }
          },
          // legend: {
          //   top: '8',
          //   left: '150',
          //   data: ['刘维红', '马晶晶']
          // },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              name: '时',
              boundaryGap: false,
              nameTextStyle: {
                color: '#51a1fa'
              },
              type: 'category',
              // boundaryGap: false,
              data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
              axisLabel: {
                color: '#606266'
              },
              axisLine: {
                lineStyle: {
                  color: '#eeeeee'
                }
              },
              axisTick: {
                show: true,
                lineStyle: {
                  color: '#000'
                }
              }
            }
          ],
          yAxis: [
            {
              name: '双',
              nameTextStyle: {
                color: '#51a1fa'
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
        }
      }
    },
    methods: {
      getEchartsData(date) {
        this.params.date = date
        return api.stationDetail.getSpinnerOutPut(this.params).then(data => {
          if (data && data.length > 0) {
            this.lineOptions.series = data.map((d, index) => {
              let list = []
              if (d.hourNumberDtoList.length > 0) {
                list = d.hourNumberDtoList.map(h => [h.hour + 1, h.number])
                list.unshift([d.hourNumberDtoList[0].hour, 0])
              }
              return {
                name: d.spinnerName,
                symbol: 'circle',
                type: 'line',
                step: 'start',
                smooth: false,
                data: list,
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {offset: 0, color: COLOR[index]},
                      {offset: 1, color: '#ffffff'}
                    ])
                  }
                }
              }
            })
            this.tooltips = data.map(d => ({
              name: d.spinnerName,
              total: d.totalNumber
            }))
            this.$refs.echart.refresh()
          } else {
            this.lineOptions.series = []
            this.tooltips = []
            this.$refs.echart.refresh()
          }
        })
      },
      open(stationCode, orderId) {
        this.params.stationCode = stationCode
        this.params.orderId = orderId
        this.$refs.window.open()
        this.$nextTick(() => {
          this.getEchartsData(this.endTime).then(() => {
            this.$refs.timeline.searchCurrentDay()
          })
        })
      },
      cancel() {
        this.$refs.window.cancel()
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog
    width: 80%
    height: 70%

  /deep/ .el-dialog__body
    padding: 0 20px
    height: calc(100% - 78px)
    overflow: hidden !important

  /deep/ .el-dialog__header
    padding: 0 !important
    background-color: #ffffff !important

  .title
    color: #1787f8
    height: 40px
    line-height: 40px
    margin: 0 20px
    border-bottom: 1px solid #eee
    border-radius: 4px

  .content
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    .charts
      width: 100%
      flex: 1
    .user-total
      flex: 0 0 30px
      display: flex
      margin: 0 20px
      /*align-items: center*/
      .user
        flex: 0 0 200px
        height: 30px
        line-height: 30px
        .icon
          display: inline-block
          width: 18px
          height: 18px
          border-radius: 50%
          vertical-align: middle
          margin-right: 10px
        .name
          font-size: 14px
          color: #606266
          margin-right: 10px
        .num
          font-size: 14px
          color: #606266
    .day-wrapper
      flex: 0 0 30px
      text-align: center
</style>
