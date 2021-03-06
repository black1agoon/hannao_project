<template>
<div style="line-height: 40px">
  <div class="input-box">
    <div class="select" @click="toggleShowBar">
      <div class="value">
        <span class="val" v-for="(val, index) in showValue" :key="index">{{val}}</span>
      </div>
      <div class="arrow">
        <i :class="['arr','fa fa-angle-down', {rotate: show}]"></i>
      </div>
    </div>
    <transition name="show">
      <div class="panel-wrap" v-show="show">
        <div class="left" >
          <div class="title">
            <div class="name">开始时间</div>
            <div class="name">结束时间</div>
            <div class="name">亮度(%)</div>
          </div>
          <div class="content" ref="content">
            <div :class="['record', {active: recordData.id === record.id}]"
                 @click.stop="getRecord(record)"
                 v-for="(record,index) in recordList"
                 :key="record.id">
              <template v-if="editIndex !== index">
                <div class="time">{{record.startTime}}</div>
                <div class="time">{{record.endTime}}</div>
                <div class="time">{{record.luminance}}</div>
              </template>
              <template v-else>
                <eui-input class="time" type="timepicker" v-model="recordData.startTime">
                </eui-input>
                <eui-input class="time" type="timepicker" v-model="recordData.endTime">
                </eui-input>
                <eui-input class="time" type="number" v-model="recordData.luminance">
                </eui-input>
              </template>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="add fa fa-plus" @click="addTime"></div>
          <div class="edit fa fa-pencil" @click="editTime"></div>
          <div class="delete fa fa-trash" @click="deleteTime"></div>
          <div v-show="editIndex !== null" class="button sure" @click="edit">确定</div>
          <div v-show="editIndex !== null" class="button cancel" @click="cancel">取消</div>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
  import api from '@/api'
  import EuiInput from '@/components/common/form/EuiInput'
  import {formatDate} from '../../../../../assets/js/tools'

  export default {
    name: 'custom-input',
    components: {
      EuiInput
    },
    props: {
      value: {},
      options: {
        type: Array,
        default: () => []
      },
      periodTypeId: {
        type: String,
        default: null
      }
    },
    computed: {
      showValue() {
        return this.recordTrueList.reduce((result, current) => {
          return result.concat(current.startTime + '-' + current.endTime + ' ' + current.luminance + '%')
        }, [])
      },
    },
    data() {
      return {
        show: false,
        recordTrueList: [],
        recordList: [],
        recordData: {},
        editIndex: null
      }
    },
    methods: {
      getPeriodTimeData() {
        api.periodTimeDetail.paged({
          page: 1,
          pageSize: 999,
          periodTypeId: this.periodTypeId
        }).then(data => {
          if (data.records && data.records.length > 0) {
            this.recordList = JSON.parse(JSON.stringify(data.records))
            this.recordTrueList = JSON.parse(JSON.stringify(data.records))
          } else {
            this.recordList = []
            this.recordTrueList = []
          }
        })
      },
      getRecord(record) {
        if (this.editIndex !== null && this.recordData.id !== record.id) {
          this.$message({
            message: '请先保存当前修改项!',
            type: 'warning'
          })
        } else {
          this.recordData = record
        }
      },
      addTime() {
        let date = new Date()
        api.periodTimeDetail.add({
          startTime: formatDate(date, 'hh:mm'),
          endTime: formatDate(date, 'hh:mm'),
          periodTypeId: this.periodTypeId,
          luminance: 0
        }).then(() => {
          this.$message({
            message: '新增成功!',
            type: 'success'
          })
          this.reload()
        })
      },
      editTime() {
        this.editIndex = this.recordList.findIndex(record => record.id === this.recordData.id)
      },
      deleteTime() {
        if (this.recordData.id) {
          api.periodTimeDetail.delete([this.recordData.id]).then(() => {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.recordData = {}
            this.editIndex = null
            this.reload()
          })
        } else {
          this.$message({
            message: '请先选择要删除的记录!',
            type: 'warning'
          })
        }
      },
      toggleShowBar() {
        if (!this.periodTypeId) {
          this.$message({
            message: '请先选择周期类型!',
            type: 'warning'
          })
        } else {
          this.show = !this.show
        }
      },
      reload() {
        this.getPeriodTimeData()
      },
      judge(event) {
        let e = event || window.event
        let ele = this.$el
        if (ele.contains(e.target)) {
          return false
        } else {
          this.show = false
        }
      },
      edit() {
        if (this.recordData.luminance > 100 || this.recordData.luminance < 0) {
          this.$message({
            message: '亮度范围(0-100)!',
            type: 'warning'
          })
        } else {
          api.periodTimeDetail.update(this.recordData).then(() => {
            this.$message({
              message: '编辑成功!',
              type: 'success'
            })
            this.editIndex = null
            this.reload()
          })
        }
      },
      cancel() {
        this.editIndex = null
        this.recordList = JSON.parse(JSON.stringify(this.recordTrueList))
      }
    },
    mounted() {
      document.addEventListener('click', this.judge)
    },
    destroyed() {
      document.removeEventListener('click', this.judge)
    },
    watch: {
      'periodTypeId'() {
        this.getPeriodTimeData(this.periodTypeId)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .input-box
    width: 400px
    position: relative
    display: inline-block
    height: 26px
    line-height: 26px
    border-radius: 4px
    border: 1px solid #dcdfe6
    vertical-align: middle
    &:hover
      border-color: #c0c4cc
    .select
      padding: 0 30px 0 10px
      display: flex
      height: 26px
      cursor: pointer
      .value
        font-size: 14px
        color: rgb(2, 2, 2)
        overflow: hidden
        .val
          background: #d9f1ff
          border: 1px solid #7fcdff
          margin-right: 5px
          border-radius: 5px
          padding: 2px 5px
          color: #039be5
      .arrow
        position: absolute
        right: 5px
        width: 25px
        text-align: center
        color: #c0c4cc
        font-size: 19px
        .rotate
          transition: all .2s
          transform: rotate(-180deg)
          transform-origin: center
    .panel-wrap
      width: 400px
      position: absolute
      top: 30px
      z-index: 10
      height: 210px
      transition: all .1s linear
      overflow: hidden
      border: 1px solid #cbcbcb
      background: #fff
      display: flex
      &.show-enter, &.show-leave-to
        height: 0
      .left
        width: 360px
        position: relative
        .title
          display: flex
          width: 100%
          height: 30px
          line-height: 30px
          font-size: 13px
          border-bottom: 1px solid #cbcbcb
          .name
            flex: 1
            text-align: center
            background: #efefef
            border-right: 1px solid #cbcbcb
            &:last-child
              border-right: none
        .content
          height: 180px
          overflow-y: auto
          position: relative
          .record
            display: flex
            height: 30px
            line-height: 30px
            font-size: 13px
            border: 1px solid #ffffff
            &.active
              background: #d9f1ff
              border: 1px solid #7fcdff
              border-radius: 3px
            .time
              flex: 1
              text-align: center
      .right
        width: 40px
        height: 210px
        border-left: 1px solid #cbcbcb
        .add
          display: block
          cursor: pointer
          width: 24px
          height: 24px
          text-align: center
          line-height: 24px
          color: #fff
          background: #19a4e0
          border-radius: 40%
          margin: 10px auto 0
        .edit
          display: block
          cursor: pointer
          width: 24px
          height: 24px
          text-align: center
          line-height: 24px
          color: #fff
          background: #67c23a
          border-radius: 40%
          margin: 10px auto 0
        .delete
          display: block
          cursor: pointer
          width: 24px
          height: 24px
          text-align: center
          line-height: 24px
          color: #fff
          background: #fb4e4e
          border-radius: 40%
          margin: 10px auto 0
        .button
          font-size: 12px
          text-align: center
          width: 30px
          height: 20px
          line-height: 20px
          margin: 5px auto
          cursor: pointer
          color: #ffffff
          border-radius: 4px
          &.sure
            background: #67c23a
            &:hover
              background: #85ce61
          &.cancel
            background: #fb4e4e
            &:hover
              background: #f78989
</style>