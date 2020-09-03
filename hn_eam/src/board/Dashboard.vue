<template>
  <div class="bg">
    <div class="wrapper">
      <div class="left">
        <div class="left-top">
          <block :width="595"
                 :height="630"
                 title="资产状况"
                 :bg-url="require('./static/img/block1.png')">
            <div class="sum">
              <div class="label">资产总额</div>
              <div class="unit">￥</div>
              <div class="num">
                <number-box :number="statisticsInfo.assetsTotalAmount">
                </number-box>
              </div>
            </div>
            <div class="detail">
              <div class="detail-item">
                <div class="d-top">
                  <div class="key">使用中</div>
                  <div class="val"><span class="unit">￥</span>{{statisticsInfo.usingAssetsAmount | setNumb}}</div>
                </div>
                <div class="d-bottom">
                  <div class="key">闲置</div>
                  <div class="val"><span class="unit">￥</span>{{statisticsInfo.unusedAssetsAmount | setNumb}}</div>
                </div>
              </div>
              <div class="detail-item">
                <div class="d-top">
                  <div class="key">本年累计折旧</div>
                  <div class="val"><span class="unit">￥</span>{{statisticsInfo.thisYearAsstesDepreciation | setNumb}}</div>
                </div>
                <div class="d-bottom">
                  <div class="key">本年报废资产</div>
                  <div class="val"><span class="unit">￥</span>{{statisticsInfo.thisYearAsstesScrap | setNumb}}</div>
                </div>
              </div>
              <div class="detail-item">
                <div class="d-top">
                  <div class="key">库存耗材</div>
                  <div class="val"><span class="unit">￥</span>{{statisticsInfo.consumableInventory | setNumb}}</div>
                </div>
                <div class="d-bottom">
                  <div class="key">本年累计领用耗材</div>
                  <div class="val"><span class="unit">￥</span>{{statisticsInfo.thisYearConsumableUsed | setNumb}}</div>
                </div>
              </div>
            </div>
            <div class="monthly">
              <div class="left-top">
                <div class="icon"></div>
                <div class="label">本月资产入库</div>
                <div class="value"><span class="unit">￥</span>{{statisticsInfo.thisMonthAssetsStockin | setNumb}}</div>
              </div>
              <div class="right-top">
                <div class="icon"></div>
                <div class="label">本月资产领用</div>
                <div class="value"><span class="unit">￥</span>{{statisticsInfo.thisMonthAssetsStockout | setNumb}}</div>
              </div>
              <div class="left-bottom">
                <div class="icon"></div>
                <div class="label">本月耗材入库</div>
                <div class="value"><span class="unit">￥</span>{{statisticsInfo.thisMonthConsumableStockin | setNumb}}</div>
              </div>
              <div class="right-bottom">
                <div class="icon"></div>
                <div class="label">本月耗材领用</div>
                <div class="value"><span class="unit">￥</span>{{statisticsInfo.thisMonthConsumableStockout | setNumb}}</div>
              </div>
            </div>
          </block>
        </div>
        <div class="left-bottom">
          <block :width="595"
                 :height="311"
                 title="本月资产变动"
                 :bg-url="require('./static/img/block2.png')">
            <assets-operation-log ref="operationLog1"
                                  label="资产入库"
                                  :log-list="thisMonthAssetsOperationLog.sockinAssetsLogList">
            </assets-operation-log>
            <assets-operation-log ref="operationLog2"
                                  label="资产领用"
                                  :log-list="thisMonthAssetsOperationLog.receiveAssetsLogList">
            </assets-operation-log>
            <assets-operation-log ref="operationLog3"
                                  label="资产转移"
                                  :log-list="thisMonthAssetsOperationLog.transferAssetsLogList">
            </assets-operation-log>
            <assets-operation-log ref="operationLog4"
                                  label="资产维修"
                                  :log-list="thisMonthAssetsOperationLog.maintainAssetsLogList">
            </assets-operation-log>
            <assets-operation-log ref="operationLog5"
                                  label="资产报废"
                                  :log-list="thisMonthAssetsOperationLog.cleanAssetsLogList">
            </assets-operation-log>
          </block>
        </div>
      </div>
      <div class="center">
        <div class="center-top">
          <div class="earth"></div>
          <div class="content">
            <div class="title">资产总数</div>
            <div class="num">{{statisticsInfo.assetsTotalNumber}}</div>
            <span class="unit">件</span>
          </div>
        </div>
        <div class="center-bottom">
          <block :width="646"
                 :height="311"
                 title="本月耗材领用"
                 :bg-url="require('./static/img/block3.png')">
            <ul class="table-title">
              <li>部门</li>
              <li>领用人</li>
              <li>资产名称</li>
              <li>领用时间</li>
              <li>用途</li>
            </ul>
            <div class="scroll-wrap">
              <div class="scroll" :style="getConsumableUsedScroll">
                <ul class="line" v-for="(consumable, index) in thisMonthConsumableUsedList" :key="index">
                  <li>{{consumable.departmentName}}</li>
                  <li>{{consumable.useridName}}</li>
                  <li>{{consumable.consumableName}}</li>
                  <li>{{consumable.stockoutTimeStr}}</li>
                  <li class="use">{{consumable.remark}}</li>
                </ul>
              </div>
            </div>
          </block>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
          <block :width="595"
                 :height="311"
                 title="资产数量金额分布"
                 :bg-url="require('./static/img/block2.png')">
            <div class="charts-wrapper">
              <div class="item">
                <div class="tit">资产种类分类</div>
                <div class="content">
                  <charts-temp :options="assetTypeOptions">
                  </charts-temp>
                </div>
              </div>
              <div class="item">
                <div class="tit">资产使用部门分类</div>
                <div class="content">
                  <div class="bar-scroll">
                    <div class="scroll" :style="getDepScroll">
                      <div class="bar-wrap" v-for="(dep, index) in depOptions" :key="index">
                        <div class="dep">{{dep.name}}</div>
                        <div class="bar">
                          <div class="mix" :style="{width: getPercentWidth(dep.value)}"></div>
                        </div>
                        <div class="percent">{{getPercent(dep.value)}}</div>
                      </div>
                      <template v-if="depOptions.length > 9">
                        <div class="bar-wrap" v-for="(dep, index) in depOptions"
                             :key="'copy' + index">
                          <div class="dep">{{dep.name}}</div>
                          <div class="bar">
                            <div class="mix" :style="{width: getPercentWidth(dep.value)}"></div>
                          </div>
                          <div class="percent">{{getPercent(dep.value)}}</div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="tit">库存耗材分类</div>
                <div class="content">
                  <charts-temp :options="consumableTypeOptions">
                  </charts-temp>
                </div>
              </div>
              <div class="item">
                <div class="tit">领用工具分类</div>
                <div class="content">
                  <charts-temp :options="receiveTypeOptions">
                  </charts-temp>
                </div>
              </div>
            </div>
            <div class="tabs-wrapper">
              <num-and-money-tabs @changeTab="changeTab">
              </num-and-money-tabs>
            </div>
          </block>
        </div>
        <div class="right-center">
          <block :width="595"
                 :height="311"
                 title="资产出入库"
                 :bg-url="require('./static/img/block2.png')">
            <asset-stockout :seriesData="seriesData">
            </asset-stockout>
          </block>
        </div>
        <div class="right-bottom">
          <block :width="595"
                 :height="311"
                 title="盘点任务表(最近一次盘点)"
                 :bg-url="require('./static/img/block2.png')">
            <div class="top">
              <div class="item">
                <div class="field">盘点发起人</div>
                <div class="value">{{newestCheckTaskInfo.checkUserName}}</div>
              </div>
              <div class="item">
                <div class="field">盘点任务名称</div>
                <div class="value">{{newestCheckTaskInfo.taskName}}</div>
              </div>
              <div class="item">
                <div class="field">盘点状态</div>
                <div class="value">{{newestCheckTaskInfo.checkStatusName}}</div>
              </div>
              <div class="item">
                <div class="field">盘点方式</div>
                <div class="value">{{newestCheckTaskInfo.checkTypeName}}</div>
              </div>
            </div>
            <div class="middle">
              <div class="check-num">
                <div class="field">盘点总数</div>
                <div class="value">{{newestCheckTaskInfo.checkTaskListAmount}}</div>
              </div>
              <div class="check-done">
                <div class="field">已盘</div>
                <div class="value">{{newestCheckTaskInfo.checkedTaskListAmount}}</div>
              </div>
              <div class="check-ever">
                <div class="field">未盘</div>
                <div class="value">{{newestCheckTaskInfo.unCheckTaskListAmount}}</div>
              </div>
            </div>
            <div class="bottom">
              <div class="result">
                <div class="status">正常</div>
                <div class="num">{{newestCheckTaskInfo.checkNormalAmount}}</div>
              </div>
              <div class="result">
                <div class="status">信息不符</div>
                <div class="num">{{newestCheckTaskInfo.checkDiscrepancyAmount}}</div>
              </div>
              <div class="result">
                <div class="status">损坏</div>
                <div class="num">{{newestCheckTaskInfo.checkDamageAmount}}</div>
              </div>
              <div class="result">
                <div class="status">遗失</div>
                <div class="num">{{newestCheckTaskInfo.checkLoseAmount}}</div>
              </div>
              <div class="result">
                <div class="status">其他</div>
                <div class="num">{{newestCheckTaskInfo.checkOtherAmount}}</div>
              </div>
            </div>
          </block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/board/api'
  import Block from './common/Block'
  import AssetStockout from './common/AssetStockout'
  import ChartsTemp from './common/ChartsTemp'
  import NumAndMoneyTabs from './common/NumAndMoneyTabs'
  import NumberBox from './common/NumberBox'
  import AssetsOperationLog from './common/AssetsOperationLog'
  import {setNumberByThree} from './static/js/tools'

  export default {
    name: 'dash-board',
    components: {
      NumAndMoneyTabs,
      Block,
      AssetStockout,
      ChartsTemp,
      NumberBox,
      AssetsOperationLog
    },
    filters: {
      setNumb(num) {
        return setNumberByThree(num)
      }
    },
    computed: {
      getDepScroll() {
        return this.depOptions.length > 9 ? {
          animationDuration: `${this.depOptions.length}s`
        } : {}
      },
      getConsumableUsedScroll() {
        return this.thisMonthConsumableUsedList.length > 5 ? {
          animationDuration: `${this.thisMonthConsumableUsedList.length}s`
        } : {}
      }
    },
    data() {
      return {
        statisticsInfo: {},
        thisMonthAssetsOperationLog: {
          cleanAssetsLogList: [],
          maintainAssetsLogList: [],
          receiveAssetsLogList: [],
          sockinAssetsLogList: [],
          transferAssetsLogList: []
        },
        thisMonthConsumableUsedList: [],
        assetsProportionInfo: {},
        seriesData: {
          assetsStockinAmountList: [],
          assetsStockoutAmountList: [],
          consumableStockinAmountList: [],
          consumableStockoutAmountList: []
        },
        newestCheckTaskInfo: {},
        assetTypeOptions: {
          color: ['#01B4D2', '#00BD8D', '#FFB508', '#D90051', '#9702FE'],
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {d}%'
          },
          legend: {
            orient: 'horizontal',
            icon: 'circle',
            itemWidth: 5,  // 设置宽度
            itemHeight: 5, // 设置高度
            data: [],
            textStyle: {
              color: '#ffffff',
              fontSize: 10,
              padding: 0,
              width: 50
            },
            left: 0,
            bottom: 10,
            itemGap: 5
          },
          series: [
            {
              name: '',
              type: 'pie',
              // roseType: 'radius',
              radius: ['35%', '50%'],
              center: ['50%', '30%'],
              label: {
                show: true,
                color: '#ffffff',
                fontSize: 10,
                formatter: '{d}%'
              },
              labelLine: {
                show: true,
                length: 5,
                length2: 5
              },
              data: [],
              // animationEasing: 'cubicInOut',
              animationDuration: 1000
            }
          ]
        },
        depOptions: [],
        consumableTypeOptions: {
          color: ['#0278E7', '#34D160', '#00C6FF', '#F19610', '#8A00E1'],
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {d}%'
          },
          legend: {
            orient: 'horizontal',
            icon: 'circle',
            itemWidth: 5,  // 设置宽度
            itemHeight: 5, // 设置高度
            data: [],
            textStyle: {
              color: '#ffffff',
              fontSize: 10,
              padding: 0,
              width: 50
            },
            left: 0,
            bottom: 10,
            itemGap: 5
          },
          series: [
            {
              name: '',
              type: 'pie',
              roseType: 'radius',
              radius: ['20', '80%'],
              center: ['50%', '35%'],
              label: {
                show: false
              },
              data: [],
              // animationEasing: 'cubicInOut',
              animationDuration: 1000
            }
          ]
        },
        receiveTypeOptions: {
          // color: ['#0278E7', '#34D160', '#00C6FF', '#F19610', '#8A00E1'],
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {d}%'
          },
          legend: {
            orient: 'horizontal',
            icon: 'circle',
            itemWidth: 5,  // 设置宽度
            itemHeight: 5, // 设置高度
            data: [],
            textStyle: {
              color: '#ffffff',
              fontSize: 10,
              padding: 0,
              width: 50
            },
            left: 0,
            bottom: 10,
            itemGap: 5
          },
          series: [
            {
              name: '',
              type: 'pie',
              roseType: 'radius',
              radius: ['20', '80%'],
              center: ['50%', '35%'],
              label: {
                show: false
              },
              data: [],
              // animationEasing: 'cubicInOut',
              animationDuration: 1000
            }
          ]
        },
        timer: null
      }
    },
    methods: {
      getPercentWidth(val) {
        let sum = this.depOptions.reduce((result, current) => {
          return result + current.value
        }, 0)
        return val / sum * 60 + 'px'
      },
      getPercent(val) {
        let sum = this.depOptions.reduce((result, current) => {
          return result + current.value
        }, 0)
        return (val / sum * 100).toFixed(0) + '%'
      },
      getBoardData() {
        api.board.getAssetStatisticsInfo().then(data => {  // 总的资产数据统计
          this.statisticsInfo = data
        })          // 总的资产数据统计
        api.board.getThisMonthAssetsOperationLogList().then(data => {
          this.thisMonthAssetsOperationLog.sockinAssetsLogList = data.sockinAssetsLogList
          this.thisMonthAssetsOperationLog.receiveAssetsLogList = data.receiveAssetsLogList
          this.thisMonthAssetsOperationLog.transferAssetsLogList = data.transferAssetsLogList
          this.thisMonthAssetsOperationLog.maintainAssetsLogList = data.maintainAssetsLogList
          this.thisMonthAssetsOperationLog.cleanAssetsLogList = data.cleanAssetsLogList
          this.thisMonthAssetsOperationLog.sockinAssetsLogList.length && this.thisMonthAssetsOperationLog.sockinAssetsLogList.push(this.thisMonthAssetsOperationLog.sockinAssetsLogList[0])
          this.thisMonthAssetsOperationLog.receiveAssetsLogList.length && this.thisMonthAssetsOperationLog.receiveAssetsLogList.push(this.thisMonthAssetsOperationLog.receiveAssetsLogList[0])
          this.thisMonthAssetsOperationLog.transferAssetsLogList.length && this.thisMonthAssetsOperationLog.transferAssetsLogList.push(this.thisMonthAssetsOperationLog.transferAssetsLogList[0])
          this.thisMonthAssetsOperationLog.maintainAssetsLogList.length && this.thisMonthAssetsOperationLog.maintainAssetsLogList.push(this.thisMonthAssetsOperationLog.maintainAssetsLogList[0])
          this.thisMonthAssetsOperationLog.cleanAssetsLogList.length && this.thisMonthAssetsOperationLog.cleanAssetsLogList.push(this.thisMonthAssetsOperationLog.cleanAssetsLogList[0])
          this.$nextTick(() => {
            this.$refs.operationLog1.scroll()
            this.$refs.operationLog2.scroll()
            this.$refs.operationLog3.scroll()
            this.$refs.operationLog4.scroll()
            this.$refs.operationLog5.scroll()
          })
        }) // 本月资产变动
        api.board.getThisMonthConsumableUsedList().then(data => {
          if (data.length > 5) {
            this.thisMonthConsumableUsedList = data.concat(data)
          } else {
            this.thisMonthConsumableUsedList = data
          }
        }) // 本月耗材领用
        api.board.getAssetsProportionInfo().then(data => {
          this.assetsProportionInfo = data
          this.assetTypeOptions.legend.data = Object.keys(this.assetsProportionInfo.assetsTypeNumberProportion)
          this.assetTypeOptions.series[0].data = Object.keys(this.assetsProportionInfo.assetsTypeNumberProportion).map(key => ({
            name: key,
            value: this.assetsProportionInfo.assetsTypeNumberProportion[key]
          }))
          this.depOptions = Object.keys(this.assetsProportionInfo.assetsDepartmentNumberProportion).map(key => ({
            name: key,
            value: this.assetsProportionInfo.assetsDepartmentNumberProportion[key]
          }))
          this.consumableTypeOptions.legend.data = Object.keys(this.assetsProportionInfo.consumableTypeNumberProportion)
          this.consumableTypeOptions.series[0].data = Object.keys(this.assetsProportionInfo.consumableTypeNumberProportion).map(key => ({
            name: key,
            value: this.assetsProportionInfo.consumableTypeNumberProportion[key]
          }))
          this.receiveTypeOptions.legend.data = Object.keys(this.assetsProportionInfo.consumableToolNumberProportion)
          this.receiveTypeOptions.series[0].data = Object.keys(this.assetsProportionInfo.consumableToolNumberProportion).map(key => ({
            name: key,
            value: this.assetsProportionInfo.consumableToolNumberProportion[key]
          }))
        })   // 资产数量金额分布
        api.board.getAssetsSummaryInfo().then(data => {           // 资产出入库
          this.seriesData.assetsStockinAmountList = data.assetsStockinAmountList
          this.seriesData.assetsStockoutAmountList = data.assetsStockoutAmountList
          this.seriesData.consumableStockinAmountList = data.consumableStockinAmountList
          this.seriesData.consumableStockoutAmountList = data.consumableStockoutAmountList
        })  // 资产出入库
        api.board.getNewestCheckTaskInfo().then(data => {
          this.newestCheckTaskInfo = data
        })  // 最新一次盘点任务详情
      },
      changeTab(index) {
        if (index === 0) {
          this.assetTypeOptions.legend.data = Object.keys(this.assetsProportionInfo.assetsTypeNumberProportion)
          this.assetTypeOptions.series[0].data = Object.keys(this.assetsProportionInfo.assetsTypeNumberProportion).map(key => ({
            name: key,
            value: this.assetsProportionInfo.assetsTypeNumberProportion[key]
          }))
          this.depOptions = Object.keys(this.assetsProportionInfo.assetsDepartmentNumberProportion).map(key => ({
            name: key,
            value: this.assetsProportionInfo.assetsDepartmentNumberProportion[key]
          }))
          this.consumableTypeOptions.legend.data = Object.keys(this.assetsProportionInfo.consumableTypeNumberProportion)
          this.consumableTypeOptions.series[0].data = Object.keys(this.assetsProportionInfo.consumableTypeNumberProportion).map(key => ({
            name: key,
            value: this.assetsProportionInfo.consumableTypeNumberProportion[key]
          }))
          this.receiveTypeOptions.legend.data = Object.keys(this.assetsProportionInfo.consumableToolNumberProportion)
          this.receiveTypeOptions.series[0].data = Object.keys(this.assetsProportionInfo.consumableToolNumberProportion).map(key => ({
            name: key,
            value: this.assetsProportionInfo.consumableToolNumberProportion[key]
          }))
        } else if (index === 1) {
          this.assetTypeOptions.legend.data = Object.keys(this.assetsProportionInfo.assetsTypeMoneyProportion)
          this.assetTypeOptions.series[0].data = Object.keys(this.assetsProportionInfo.assetsTypeMoneyProportion).map(key => ({
            name: key,
            value: this.assetsProportionInfo.assetsTypeMoneyProportion[key]
          }))
          this.depOptions = Object.keys(this.assetsProportionInfo.assetsDepartmentMoneyProportion).map(key => ({
            name: key,
            value: this.assetsProportionInfo.assetsDepartmentMoneyProportion[key]
          }))
          this.consumableTypeOptions.legend.data = Object.keys(this.assetsProportionInfo.consumableTypeMoneyProportion)
          this.consumableTypeOptions.series[0].data = Object.keys(this.assetsProportionInfo.consumableTypeMoneyProportion).map(key => ({
            name: key,
            value: this.assetsProportionInfo.consumableTypeMoneyProportion[key]
          }))
          this.receiveTypeOptions.legend.data = Object.keys(this.assetsProportionInfo.consumableToolMoneyProportion)
          this.receiveTypeOptions.series[0].data = Object.keys(this.assetsProportionInfo.consumableToolMoneyProportion).map(key => ({
            name: key,
            value: this.assetsProportionInfo.consumableToolMoneyProportion[key]
          }))
        }
      }
    },
    mounted() {
      this.getBoardData()
      setInterval(() => {
        this.getBoardData()
      }, 5 * 1000 * 60)
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './static/stylus/scroll.styl'
  .bg
    width: 1920px
    height: 1080px
    background-image: url("./static/img/bg.png")
    background-size: cover
    background-repeat: no-repeat
    display: flex
    flex-direction: column
    .wrapper
      width: 1840px
      height: 945px
      margin: 90px auto 45px
      display: flex
      flex-direction: row
      .left
        width: 595px
        display: flex
        flex-direction: column
        justify-content: space-between
        .left-top
          width: 595px
          height: 630px
          .sum
            height: 140px
            display: flex
            .label
              margin-left: 50px
              font-size: 22px
              color: #ffffff
              line-height: 140px
            .unit
              color: rgba(255, 227, 0, 1)
              font-size: 26px
              margin-top: 80px
            .num
              margin-top: 35px
              color: rgba(255, 227, 0, 1)
              font-size: 26px
          .detail
            display: flex
            margin: 0 45px 0 20px
            .detail-item
              flex: 1
              position: relative
              margin-left: 30px
              padding-right: 15px
              &:after
                position: absolute
                right: 0
                top: 0
                display: inline-block
                content: ''
                width: 1px
                height: 128px
                background: linear-gradient(0deg, rgba(0, 246, 255, 1))
              &:last-child:after
                background: none
              .d-top, .d-bottom
                .key
                  font-size: 16px
                  color: #ffffff
                .val
                  margin-top: 13px
                  font-family: 'DIN-Medium'
                  font-size: 28px
                  color: rgba(211, 199, 102, 1)
                  .unit
                    font-size: 18px
              .d-bottom
                margin-top: 32px
          .monthly
            margin: 31px 37px
            display: flex
            flex-wrap: wrap
            justify-content: space-between
            align-content: space-between
            height: 235px
            .left-top, .right-top, .left-bottom, .right-bottom
              width: 254px
              height: 111px
              background: rgba(0, 246, 255, .15)
              position: relative
              .icon
                display: inline-block
                width: 63px
                height: 64px
                background-repeat: no-repeat
                background-size: 63px 64px
                margin: 25px 0 0 32px
              .label
                position: absolute
                color: #ffffff
                font-size: 14px
                top: 25px
                left: 104px
              .value
                position: absolute
                font-family: 'DIN-Medium'
                color: rgba(211, 199, 102, 1)
                font-size: 32px
                top: 52px
                left: 104px
                .unit
                  font-size: 14px
            .left-top
              border-radius: 16px 16px 0 16px
              .icon
                background-image: url("./static/img/monthly1.png")
            .right-top
              border-radius: 16px 16px 16px 0
              .icon
                background-image: url("./static/img/monthly2.png")
            .left-bottom
              border-radius: 16px 0 16px 16px
              .icon
                background-image: url("./static/img/monthly3.png")
            .right-bottom
              border-radius: 0 16px 16px 16px
              .icon
                background-image: url("./static/img/monthly4.png")
        .left-bottom
          width: 595px
          height: 311px
      .center
        width: 646px
        display: flex
        flex-direction: column
        justify-content: space-between
        .center-top
          width: 646px
          height: 630px
          position: relative
          .earth
            position: absolute
            left: -9px
            top: 20px
            width: 664px
            height: 648px
            background-image: url("./static/img/center.png")
            background-size: 664px 648px
            background-repeat: no-repeat
          .content
            margin-top: 215px
            text-align: center
            .title
              font-size: 40px
              color: #ffffff
            .num
              display: inline-block
              margin-top: 23px
              font-family: 'DIN-Medium'
              font-size: 100px
              line-height: 80px
              background-image: -webkit-linear-gradient(bottom, rgba(1, 91, 94, 1), rgba(0, 246, 255, 1))
              -webkit-background-clip: text
              -webkit-text-fill-color: transparent
            .unit
              vertical-align: bottom
              color: #ffffff
              font-size: 24px
        .center-bottom
          width: 646px
          height: 311px
          overflow: hidden
          .table-title
            margin: 0 8px
            height: 42px
            line-height: 42px
            color: #ffffff
            font-size: 20px
            display: flex
            background: rgba(0, 246, 255, .1)
            li
              flex: 1
              text-align: center
              &:last-child
                flex: 1.3
          .scroll-wrap
            height: 210px
            overflow: hidden
            &:hover
              .scroll
                animation-play-state: paused
            .scroll
              animation-name: columnScroll
              animation-iteration-count: infinite
              animation-timing-function: linear
              .line
                display: flex
                line-height: 42px
                height: 42px
                margin: 0 8px
                color: #ffffff
                font-size: 18px
                &:nth-of-type(2n)
                  background: rgba(0, 246, 255, .1)
                li
                  flex: 1
                  text-align: center
                  &:last-child
                    flex: 1.3
                  &.use
                    white-space: nowrap
                    overflow: hidden
                    text-overflow: ellipsis
      .right
        width: 595px
        display: flex
        flex-direction: column
        justify-content: space-between
        .right-top, .right-center, .right-bottom
          width: 595px
          height: 311px
        .right-top
          position: relative
          .charts-wrapper
            width: 580px
            height: 255px
            margin: 0 8px
            display: flex
            .item
              flex: 1
              &:nth-of-type(2n)
                background: rgba(0, 246, 255, .05)
              .tit
                font-size: 14px
                text-align: center
                color: #ffffff
                margin-top: 32px
              .content
                height: 210px
                .bar-scroll
                  height: 200px
                  overflow: hidden
                  margin-top: 5px
                  .scroll
                    animation-name: columnScroll
                    animation-iteration-count: infinite
                    animation-timing-function: linear
                  &:hover
                    .scroll
                      animation-play-state: paused
                  .bar-wrap
                    display: flex
                    color: #ffffff
                    font-size: 10px
                    height: 12px
                    margin-top: 10px
                    .dep
                      width: 45px
                      text-align: right
                      white-space: nowrap
                      overflow: hidden
                      text-overflow: ellipsis
                    .bar
                      width: 60px
                      height: 4px
                      background: rgba(186, 186, 186, .4)
                      border-radius: 2px
                      margin: 4px
                      .mix
                        height: 4px
                        background: linear-gradient(to left, rgba(1, 254, 83, 1), rgba(45, 242, 250, 1))
                        border-radius: 2px
                    .percent
                      width: 30px
                      text-align: left
          .tabs-wrapper
            width: 90px
            height: 18px
            position: absolute
            right: 10px
            top: 54px
        .right-bottom
          .top
            margin: 0 8px
            display: flex
            .item
              flex: 1
              height: 70px
              border-bottom: 2px solid #024463
              border-right: 2px solid #024463
              color: #ffffff
              text-align: center
              &:last-child
                border-right: none
              .field
                font-size: 16px
                margin-top: 16px
              .value
                font-size: 18px
                margin-top: 7px
          .middle
            display: flex
            height: 100px
            justify-content: center
            align-items: center
            .check-num, .check-done, .check-ever
              background-repeat: no-repeat
              .field
                color: #ffffff
                font-size: 12px
                text-align: center
              .value
                font-family: 'DIN-Medium'
                text-align: center
                margin-top: 6px
            .check-num
              width: 88px
              height: 87px
              background-image: url("./static/img/checknum.png")
              background-size: 88px 87px
              .field
                margin-top: 20px
              .value
                font-size: 32px
                color: rgba(211, 199, 102, 1)
            .check-done
              width: 99px
              height: 97px
              background-image: url("./static/img/checkdone.png")
              background-size: 99px 97px
              .field
                margin-top: 25px
              .value
                font-size: 25px
                color: #ffffff
            .check-ever
              width: 98px
              height: 97px
              background-image: url("./static/img/checkever.png")
              background-size: 98px 97px
              .field
                margin-top: 25px
              .value
                font-size: 25px
                color: #ffffff
          .bottom
            display: flex
            margin: 5px 25px
            justify-content: space-around
            .result
              width: 103px
              height: 67px
              background-image: url("./static/img/result.png")
              background-size: 103px 67px
              background-repeat: no-repeat
              .status
                margin-top: 13px
                color: #ffffff
                text-align: center
                font-size: 14px
              .num
                font-family: 'DIN-Medium'
                margin-top: 5px
                color: rgba(211, 199, 102, 1)
                text-align: center
                font-size: 28px
</style>