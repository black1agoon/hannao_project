<template>
  <eui-window ref="window"
              :options="windowOptions">
     <div class="wrapper">
        <div class="compare-result">
          <div class="value"></div>
          <div class="value"></div>
          <div class="title">对比结果</div>
          <div class="value" :style="{background: getBgColor(index)}" v-for="(asset, index) in compareData[0].list" :key="index">
            {{asset.contrastResultName}}
          </div>
        </div>
        <div class="task-wrap" v-for="(data, index) in compareData" :key="index">
          <div class="titles">
            <div class="title">盘点任务名称</div>
            <div class="title">盘点人</div>
            <div class="title">盘点备注</div>
          </div>
          <div class="values">
            <div class="value border">{{data.taskName}}</div>
            <div class="value border">{{data.checkUserName}}</div>
            <div class="value border">{{data.remark}}</div>
          </div>
          <div class="titles">
            <div class="title">资产编码</div>
            <div class="title">资产名称</div>
            <div class="title">盘点结果</div>
          </div>
          <div :style="{background: getBgColor(idx)}" class="values" v-for="(asset, idx) in data.list" :key="idx">
            <div class="value">{{asset.assetCode}}</div>
            <div class="value">{{asset.assetName}}</div>
            <div class="value">{{asset.checkResultName}}</div>
          </div>
        </div>
     </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import helper from '@/app/app.helpers'
  import api from '@/api'
  export default {
    name: 'asset-check-compare-window',
    components: {
      EuiWindow
    },
    data() {
      return {
        helper,
        windowOptions: {
          title: '对比盘点单',
          width: '1000px'
        },
        compareData: [{list: []}], // 初始化取compareData[0]的值的时候需要list
        stateList: []
      }
    },
    methods: {
      open(idlist) {
        api.assetCheck.compare(idlist).then(data => {
          this.$refs.window.open()
          this.compareData = data
          // this.compareData.push(data[0])
          this.stateList = this.compareData[0].list.map(l => l.contrastResult)
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getBgColor(index) {
        if (this.stateList[index] === '1') {
          return '#ffffff'
        } else if (this.stateList[index] === '2') {
          return '#ffff00'
        } else if (this.stateList[index] === '3') {
          return '#ff0000'
        }
      }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog__body
    /*height: 600px*/
    border-radius: 5px
  /deep/ .el-dialog__footer
    padding: 0 !important
  .wrapper
    width: 100%
    overflow-x: auto
    white-space: nowrap
    font-size: 0
    margin-bottom: 20px
    .compare-result
      width: 99px
      /*height: 590px*/
      display: inline-block
      font-size: 14px
      vertical-align: top
      text-align: center
      .title
        height: 30px
        line-height: 30px
        border-bottom: 1px solid #ebeef5
        color: #000
        font-weight: bold
        border-right: 1px solid #ebeef5
      .value
        text-align: center
        border-bottom: 1px solid #ebeef5
        height: 30px
        line-height: 30px
        border-right: 1px solid #ebeef5
    .task-wrap
      font-size: 14px
      width: 449px
      /*height: 590px*/
      border-right: 1px solid #ebeef5
      overflow-y: auto
      display: inline-block
      .titles,.values
        display: flex
        height: 30px
        line-height: 30px
        border-bottom: 1px solid #ebeef5
        .title,.value
          flex: 1
          text-align: center
        .title
          color: #000
          font-weight: bold
          border-right: 1px solid #ebeef5
        .border
          border-right: 1px solid #ebeef5
</style>