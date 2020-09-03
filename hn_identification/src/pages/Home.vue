<template>
  <div class="home-wrapper">
    <div class="block block1">
      <p class="title">企业</p>
      <img class="img" src="../assets/img/block1.png">
      <div class="info">
        <div class="item">
          <p class="num">
            <number-scroll :number="total[0].total">
            </number-scroll>
          </p>
          <p class="label">总数</p>
        </div>
        <div class="item">
          <p class="num">
            <number-scroll
                :number="total[0].dayNumber">
            </number-scroll>
          </p>
          <p class="label">日增量</p>
        </div>
      </div>
    </div>
    <div class="block block2">
      <p class="title">人员eID</p>
      <img class="img" src="../assets/img/block2.png">
      <div class="info">
        <div class="item">
          <p class="num">
            <number-scroll
                :number="total[1].total">
            </number-scroll>
          </p>
          <p class="label">总数</p>
        </div>
        <div class="item">
          <p class="num">
            <number-scroll
                :number="total[1].dayNumber">
            </number-scroll>
          </p>
          <p class="label">日增量</p>
        </div>
      </div>
    </div>
    <div class="block block3">
      <p class="title">主动码</p>
      <img class="img" src="../assets/img/block3.png">
      <div class="sum">
        <label class="third">总数</label>
        <p>
          <number-scroll
            :number="total[2].total">
          </number-scroll>
        </p>
      </div>
      <div class="info info2">
        <div class="item">
          <p class="num">{{total[2].details[0].total}}</p>
          <p class="label">边缘设备数量</p>
        </div>
        <div class="item">
          <p class="num">{{total[2].details[1].total}}</p>
          <p class="label">过程计算数量</p>
        </div>
        <div class="item">
          <p class="num">{{total[2].details[2].total}}</p>
          <p class="label">设备数量</p>
        </div>
      </div>
    </div>
    <div class="block block4">
      <p class="title">标签</p>
      <img class="img" src="../assets/img/block4.png">
      <div class="sum">
        <label class="fourth">总数</label>
        <p>
          <number-scroll
              :number="total[3].total">
          </number-scroll>
        </p>
      </div>
      <div class="info info2">
        <div class="item">
          <p class="num">{{total[3].details[0].total}}</p>
          <p class="label">RFID防伪溯源</p>
        </div>
        <div class="item">
          <p class="num">{{total[3].details[1].total}}</p>
          <p class="label">RFID生产管控</p>
        </div>
        <div class="item">
          <p class="num">{{total[3].details[2].total}}</p>
          <p class="label">二维码数量</p>
        </div>
      </div>
    </div>
    <dash-block
        class="block-view"
        @titleTabIndex="getShowIndex"
        :title="pieOptions.title">
      <dash-chart
          v-if="showTitleIndex === 0"
          :options="pieOptions.options">
      </dash-chart>
      <dash-chart
          v-else-if="showTitleIndex === 1"
          :options="line3Options">
      </dash-chart>
    </dash-block>
    <dash-block
        class="block-view"
        :title="tableOptions.title">
      <dash-table
          :options="tableOptions"
          @reloadTable="tableOptions.reload">
      </dash-table>
    </dash-block>
    <dash-block
        class="block-view"
        :title="lineOptions.title"
        :tab-list="lineOptions.tabList"
        @atvindex="getLineActiveIndex">
      <dash-chart
          style="height: 310px"
          :options="lineOptions.options">
      </dash-chart>
    </dash-block>
    <dash-block
        class="block-view"
        :title="line2Options.title"
        :tab-list="line2Options.tabList"
        @atvindex="getLine2ActiveIndex">
      <dash-chart
          style="height: 310px"
          :options="line2Options.options">
      </dash-chart>
    </dash-block>
  </div>
</template>

<script>
  import api from '@/api'
  import DashBlock from './dashboard/components/DashBlock'
  import DashChart from './dashboard/components/DashChart'
  import DashTable from './dashboard/components/DashTable'
  import NumberScroll from './dashboard/components/NumberScroll'
  import {HOME} from './dashboard/dashboard.config'
  const TIME = 60 * 5 * 1000
  export default {
    name: 'home',
    components: {
      DashBlock,
      DashChart,
      DashTable,
      NumberScroll
    },
    computed: {
    },
    data() {
      return {
        timer: null,
        total: Array.from({length: 4}, () => ({
          details: Array.from({length: 3}, () => ({}))
        })),
        pieOptions: HOME.PIE_OPTIONS,
        query: {
          page: 1,
          pageSize: 5,
        },
        tableOptions: Object.assign({...HOME.TABLE_OPTIONS}, {
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.enterpriseDetail()
          }
        }),
        lineOptions: {...HOME.LINE_OPTIONS},
        line2Options: {...HOME.LINE2_OPTIONS},
        lineType: 1,
        line2Type: 1,
        showTitleIndex: 0,
        line3Options: {...HOME.ACTIVE_LINE_OPTIONS}
      }
    },
    methods: {
      getTotal() {
        api.home.total().then(data => {
          if (data && data.length > 0) {
            this.total = data
          }
        })
      },
      employeeCount() {
        api.home.employeeCount().then(data => {
          if (data && data.length > 0) {
            this.pieOptions.options.legend.data = data.map(d => d.name)
            this.pieOptions.options.series[0].data = data.map(d => ({
              name: d.name,
              value: d.count
            }))
          }
        })
      },
      enterpriseDetail() {
        api.home.enterpriseDetail(this.query).then(data => {
          this.tableOptions.total = data.total
          this.tableOptions.data = data.records
          this.tableOptions.columns = [
            {prop: 'name', label: '企业名称', minWidth: 150, align: 'left', showTips: true},
            {prop: 'activeCodeNumber', label: '主动码数'},
            {prop: 'worker', label: '人员数量'},
            // {prop: 'activeCodeNumber', label: '标签数'},
            {prop: 'dataServiceCode', label: '数据服务统一编码', minWidth: 250, showTips: true}
          ]
        })
      },
      enterpriseEmployeeMonth() {
        api.home.enterpriseEmployeeMonth(this.lineType).then(data => {
          if (data) {
            if (this.lineType === 1 || this.lineType === 2) {
              this.lineOptions.options.xAxis[0].data = data.employeeList.map(d => `${d.month}-${d.day}`)
            } else if (this.lineType === 3) {
              this.lineOptions.options.xAxis[0].data = data.employeeList.map(d => `${d.year}-${d.month}`)
            }
            this.lineOptions.options.series[0].data = data.enterpriseList.map(d => d.number)
            this.lineOptions.options.series[1].data = data.employeeList.map(d => d.number)
          }
        })
      },
      activeCodeMonth() {
        api.home.activeCodeMonth(this.line2Type).then(data => {
          if (data) {
            if (this.line2Type === 1 || this.line2Type === 2) {
              this.line2Options.options.xAxis[0].data = data.map(d => `${d.month}-${d.day}`)
            }else if (this.line2Type === 3) {
              this.line2Options.options.xAxis[0].data = data.map(d => `${d.year}-${d.month}`)
            }
            this.line2Options.options.series[0].data = data.map(d => d.number)
          }
        })
      },
      getLineActiveIndex(index) {
        this.lineType = index + 1
        this.enterpriseEmployeeMonth()
      },
      getLine2ActiveIndex(index) {
        this.line2Type = index + 1
        this.activeCodeMonth()
      },
      activeCodeStartUpDayRate() {
        api.home.activeCodeStartUpDayRate().then(data => {
          console.log(data)
          this.line3Options.legend.data = data.activeCodeTypeOneList.map(type => type.codeTypeName)
          this.line3Options.xAxis[0].data = data.activeCodeStartUpDayRateList.map(day => day.day)
          this.line3Options.series = data.activeCodeStartUpDayRateList.reduce((rst, cur) => {
            cur.activeCodeStartUpDayRateMapList.forEach((tp, idx) => {
              if (rst.findIndex(r => r.name === tp.type) === -1) {
                rst.push({
                  name: tp.type,
                  symbol: 'circle',
                  type: 'line',
                  smooth: true,
                  data: []
                })
              }
              rst[idx].data.push(tp.rate)
            })
            return rst
          }, [])
        })
      },
      getShowIndex(idx) {
        this.showTitleIndex = parseInt(idx)
      }
    },
    mounted() {
      this.getTotal()
      this.employeeCount()
      this.enterpriseDetail()
      this.enterpriseEmployeeMonth()
      this.activeCodeMonth()
      this.activeCodeStartUpDayRate()
      this.timer = setInterval(() => {
        this.getTotal()
        this.employeeCount()
        this.enterpriseDetail()
        this.enterpriseEmployeeMonth()
        this.activeCodeMonth()
      }, TIME)
    },
    watch: {
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.home-wrapper
  min-width: 1200px
  overflow-x: hidden
  background: #F0F2F5
  display: flex
  flex-wrap: wrap
  padding: 20px
  box-sizing: border-box
  .block
    position: relative
    width: calc((100% - 60px) / 4)
    height: 128px
    margin-right: 20px
    border-radius: 6px
    &:nth-of-type(4)
      margin-right: 0
    &.block1
      background:linear-gradient(270deg,rgba(130,207,248,1) 0%,rgba(98,131,238,1) 100%)
    &.block2
      background:linear-gradient(270deg,rgba(190,50,197,1) 0%,rgba(139,62,224,1) 100%)
    &.block3
      background:linear-gradient(270deg,rgba(255,186,134,1) 0%,rgba(233,104,124,1) 100%)
    &.block4
      background:linear-gradient(270deg,rgba(143,238,140,1) 0%,rgba(68,214,154,1) 100%)
    .title
      position: absolute
      font-size: 16px
      color: #ffffff
      top: 14px
      left: 19px
    .img
      position: absolute
      left: 0
      top: 0
      right: 0
      bottom: 0
      margin: auto
    .sum
      position: absolute
      top: 15px
      right: 20px
      label
        display: inline-block
        width: 32px
        height: 17px
        line-height: 17px
        text-align: center
        background: #ffffff
        border-radius: 4px
        opacity: .85
        font-size: 12px
        vertical-align: top
        margin: 11px 10px 0 0
        &.third
          color: rgb(242,145,128)
        &.fourth
          color: rgb(108,226,146)
      p
        display: inline-block
        vertical-align: top
        height: 40px
        color: #ffffff
        font-size: 44px
    .info
      display: flex
      position: absolute
      width: 100%
      top: 45px
      .item
        flex: 1
        color: #ffffff
        text-align: center
        .num
          font-size: 43px
          font-family: 'Teko-Medium'
          text-align: center
        .label
          margin-top: 5px
          font-size: 12px
      &.info2
        top: 55px
        .item
          position: relative
          &:after
            position: absolute
            right: 0
            top: 10px
            content: ''
            width: 1px
            height: 20px
            background: #ffffff
          .num
            font-size: 32px
  .block-view
    width: calc((100% - 20px) / 2)
    margin: 20px 20px 0 0
    height: 354px
    &:nth-of-type(2n)
      margin-right: 0
</style>
