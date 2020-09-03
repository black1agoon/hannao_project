<template>
  <eui-window ref="window"
              :options="windowOptions">
    <div class="window-container">
      <div class="row">
        <div class="label">工序选择: </div>
        <ul class="process-box">
          <li v-for="(process, index) in processList"
              :class="{ active: currentIndex === index }"
              @click="handleClick(index)"
              :key="index">{{process.processName}}</li>
        </ul>
      </div>
      <div class="row">
        <div class="label">不良原因:</div>
        <div class="bad-reason">
          <el-checkbox-group v-model="checkedReason">
            <el-checkbox class="checkbox" v-for="(reason, index) in badReasonList"
                         :label="reason.badReasonID" :key="index">{{reason.badReasonName}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="row">
        <div class="label">已选不良原因:</div>
        <div class="tag-box">
          <el-tag
              :key="index"
              v-for="(reason, index) in chooseReasonList"
              closable
              :disable-transitions="false"
              @close="handleClose(reason)">
            {{reason.badReasonName}}
          </el-tag>
        </div>
      </div>
    </div>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/app/produce/components/form/EuiWindow'
  import { api } from '@/api'
  export default {
    name: 'bad-reason-window',
    components: {
      EuiWindow
    },
    props: {
      barCode: {
        type: String,
        default: ''
      }
    },
    computed: {
      badReasonList() {
        return this.processList.length > 0 ? this.processList[this.currentIndex].badReasonList : []
      },
      chooseReasonList() {
        const list = []
        this.processList.forEach(process => {
          process.badReasonList.forEach(reason => {
            if (this.checkedReason.includes(reason.badReasonID)) {
              list.push({
                ...reason,
                processName: process.processName
              })
            }
          })
        })
        return list
      }
    },
    data() {
      return {
        windowOptions: {
          title: '不良原因选择',
          width: '800px'
        },
        processList: [],
        currentIndex: 0,
        checkedReason: [] //
      }
    },
    methods: {
      open() {
        api.produce.report.selectReportWorkStep({
          BarCode: this.barCode
        }).then(data => {
          this.processList = data || []
          this.$refs.window.open()
        })
      },
      sure() {
        // const list = this.processList.slice()
        // list.forEach((process) => {
        //   process.badReasonList = process.badReasonList.filter(reason => this.checkedReason.includes(reason.badReasonID))
        // })
        this.$emit('badreason', this.chooseReasonList)
        this.cancel()
      },
      cancel() {
        this.$refs.window.cancel()
      },
      handleClick(index) {
        this.currentIndex = index
      },
      handleClose(reason) {
        this.checkedReason = this.checkedReason.filter(id => id !== reason.badReasonID)
      }
    }
  }
</script>

<style lang="sass" scoped>
  ::v-deep
    .el-dialog__body
      height: 500px
  .window-container
    height: 100%
    padding: 50px
    .row
      display: flex
      margin-bottom: 30px
      .label
        font-size: 14px
        margin-right: 40px
      .process-box
        display: flex
        margin: 0
        padding: 0
        li
          cursor: pointer
          margin-right: 10px
          list-style: none
          width: 60px
          height: 28px
          text-align: center
          line-height: 26px
          border: 1px solid #D9D9D9
          color: #5F5F5F
          &.active
            color: #1691E9
            border: 1px solid #1691E9
      .bad-reason
        .checkbox
          display: block
          margin: 5px 0
      .tag-box
        display: flex
        flex-wrap: wrap
        width: 540px
        .el-tag
          margin: 0 10px 10px 0
</style>