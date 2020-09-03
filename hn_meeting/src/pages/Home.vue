<template>
  <eui-layout class="layout" :regions="regions">
    <div slot="north" style="line-height: 40px">
      <div class="input-wrapper">
        <span class="label">日期:</span>
        <eui-input
            class="input"
            type="date"
            @change="dateChange"
            v-model="meetingQuery.date">
        </eui-input>
      </div>
    </div>
    <div class="scroll-box" ref="wrapper" slot="center">
      <ul class="room-wrap" ref="roomlist">
        <li :class="['room', {active: room.id === meetingQuery.roomId}]"
            v-for="(room, index) in roomList"
            :key="index"
            @click="roomChange(room.id, $event)">
          <p class="name">{{room.name}}</p>
          <p class="num">{{room.num}}</p>
        </li>
      </ul>
    </div>
    <div class="south-wrap" slot="south">
      <div class="meeting-list">
        <p class="title">会议列表</p>
        <!--<div class="table"></div>-->
        <eui-table
            class="table"
            ref="table"
            :show-index="false"
            :show-pagination="false"
            :highlight-current-row="false"
            :options="tableOptions">
        </eui-table>
      </div>
      <meeting-form
          class="meeting-add"
          :room-id="meetingQuery.roomId"
          @reload="getRoomData">
      </meeting-form>
    </div>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {HOME} from './config/config.config'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiTable from '@/components/common/form/EuiTable'
  import MeetingForm from './common/MeetingForm'
  import BScroll from 'better-scroll'
  import {formatDate} from '../assets/js/tools'

  export default {
    name: 'home',
    components: {
      EuiLayout,
      EuiInput,
      EuiTable,
      MeetingForm
    },
    computed: {},
    data() {
      return {
        regions: HOME.REGIONS,
        roomList: [],
        meetingQuery: {
          date: formatDate(new Date(), 'yyyy-MM-dd'),
          roomId: null
        },
        query: {
          page: 1,
          pageSize: 999
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'meetingDate', label: '日期'},
            {prop: 'startTime', label: '开始时间'},
            {prop: 'endTime', label: '结束时间'},
            {prop: 'theme', label: '主题'}
          ]
        }
      }
    },
    methods: {
      initScroll() {
        let sWidth = 400
        let margin = 20
        let width = (sWidth + margin) * this.roomList.length - margin
        this.$refs.roomlist.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, {
              scrollX: true,
              eventPassthrough: 'vertical',
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      getRoomData() {
        api.home.getMeetingNum(this.meetingQuery.date).then(data => {
          if (data) {
            this.roomList = data.map(r => ({
              name: r.meetingRoomName,
              id: r.meetingRoomId,
              num: r.meetingNumber
            }))
            if (!this.meetingQuery.roomId) { // 如果roomId不存在
              this.meetingQuery.roomId = this.roomList.length > 0 ? this.roomList[0].id : null
            }
            this.getMeetingList()
          }
          this.initScroll()
        })
      },
      getMeetingList() {
        api.home.getMeetingList(this.meetingQuery).then(data => {
          if (data) {
            this.tableOptions.data = data
          }
        })
      },
      dateChange() {
        this.getRoomData()
      },
      roomChange(roomId, event) {
        if (!event._constructed) {
          return;
        }
        this.meetingQuery.roomId = roomId
        this.getMeetingList()
      }
    },
    mounted() {
      this.getRoomData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.layout
  min-width: 1200px
  .input-wrapper
    padding: 0 26px
    .label
      font-size: 14px
      margin: 0 5px
    .input
      width: 150px !important

  .scroll-box
    overflow: hidden
    white-space: nowrap
    box-sizing: border-box
    margin: 10px 26px
    .room-wrap
      .room
        display: inline-block
        width: 400px
        height: 140px
        background: #F8F8F8
        border-radius: 2px
        margin-right: 20px
        cursor: pointer
        transition: all .2s
        &.active
          background: #C4E0FF
        .name
          margin: 22px 0 0 26px
          font-size: 16px
          color: rgba(0, 0, 0, .45)
        .num
          font-family: 'pingfang'
          font-weight: bold
          text-align: center
          margin-top: 30px
          font-size: 36px
          color: rgba(0, 0, 0, 0.85)
  .south-wrap
    display: flex
    width: 100%
    height: 100%
    border-top: 4px solid #F8F8F8
    .meeting-list
      flex: 1
      overflow: hidden
      border-right: 4px solid #F8F8F8
      .title
        height: 57px
        padding: 23px 0 10px 26px
        box-sizing: border-box
        font-family: 'pingfang'
        font-size: 14px
        color: #333333
      .table
        width: 100%
        box-sizing: border-box
        padding: 0 26px
        height: calc(100% - 57px)
    .meeting-add
      flex: 0 0 680px
  /deep/ .el-table
    .cell
      line-height: 40px
    th
      background: #F8F8F8
</style>
