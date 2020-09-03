<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      <div class="input-wrapper">
        <span class="label">会议室:</span>
        <eui-input
            class="select"
            :clearable="true"
            type="select"
            @change="roomChange"
            v-model="roomId"
            :options="formOptions.roomId">
        </eui-input>
      </div>
      <el-radio-group slot="right" size="mini" v-model="tabValue" @change="radioChange">
        <el-radio-button label="mymeeting">我的会议</el-radio-button>
        <el-radio-button label="day">日</el-radio-button>
        <el-radio-button label="month">月</el-radio-button>
        <el-radio-button label="year">年</el-radio-button>
      </el-radio-group>
    </main-toolbar>
    <div class="center-wrap" slot="center">
      <my-meeting ref="mymeeting"
                  :room-id="roomId"
                  v-show="tabValue === 'mymeeting'"
                  @meetingClick="(meeting) => {onBtnClick('meetingClick', meeting)}">
      </my-meeting>
      <day-meeting ref="day"
                   :api="apiDay"
                   :date="day"
                   :room-id="roomId"
                   v-show="tabValue === 'day'">
      </day-meeting>
      <month-meeting
          :api="apiMonth"
          :room-id="roomId"
          v-show="tabValue === 'month'"
          :date="selectDate"
          ref="month"
          @go2DayMeeting="go2DayMeeting"
          @meetingClick="(meeting) => {onBtnClick('meetingClick', meeting)}">
      </month-meeting>
      <year-meeting ref="year"
                    :api="apiYear"
                    :room-id="roomId"
                    @go2DayMeeting="go2DayMeeting"
                    v-show="tabValue === 'year'">
      </year-meeting>
    </div>
    <next-meeting-block
        class="east-wrap"
        :api="apiNext"
        slot="east">
    </next-meeting-block>
    <meeting-calendar-window
        :window-api="windowApi"
        ref="window"
        :input-options="formOptions"
        @reload="reload">
    </meeting-calendar-window>
    <meeting-calendar-detail-window
        ref="detail"
        :api="apiDetail">
    </meeting-calendar-detail-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {CALENDAR} from './meeting.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiInput from '@/components/common/form/EuiInput'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import MonthMeeting from './components/MonthMeeting'
  import DayMeeting from './components/DayMeeting'
  import MyMeeting from './components/MyMeeting'
  import MeetingCalendarWindow from './window/MeetingCalendarWindow'
  import MeetingCalendarDetailWindow from './window/MeetingCalendarDetailWindow'
  import NextMeetingBlock from './components/NextMeetingBlock'
  import YearMeeting from './components/YearMeeting'
  export default {
    name: 'meeting-calendar',
    _meta: {
      path: '/meeting/calendar',
      title: '会议日历'
    },
    components: {
      EuiLayout,
      EuiInput,
      MonthMeeting,
      MyMeeting,
      DayMeeting,
      MainToolbar,
      MeetingCalendarWindow,
      MeetingCalendarDetailWindow,
      NextMeetingBlock,
      YearMeeting
    },
    data() {
      return {
        helper,
        REGIONS: CALENDAR.REGIONS,
        day: new Date(),
        selectDate: new Date(),
        buttons: helper.getMainButtons(),
        tabValue: 'month',
        roomId: null,
        formOptions: {
          roomId: []
        },
        apiDay: api.meetingCalendar.getDayMeeting,
        apiMonth: api.meetingCalendar.getMonthMeeting,
        apiYear: api.meetingCalendar.getYearMeeting,
        apiNext: api.meetingCalendar.getNextMeeting,
        windowApi: {
          add: api.meetingCalendar.add,
          update: api.meetingCalendar.update,
          finish: api.meetingCalendar.finishMeeting,
          cancel: api.meetingCalendar.cancel
        },
        apiDetail: api.meetingCalendar.getAttendDetail
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          meetingClick: (row) => {
            // this.$refs.window.open(row)
            api.meetingCalendar.getDetail(row.id).then(data => {
              if (data.status === 2 || data.status === 4) {
                this.$refs.detail.open(data)
              } else {
                this.$refs.window.open(data)
              }
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      reload() {
        this.radioChange(this.tabValue)
      },
      radioChange(label) {
        if (label === 'mymeeting') {
          this.$refs.mymeeting.getMyData()
        } else if (label === 'day') {
          this.$refs.day.getDayData()
        } else if (label === 'month') {
          this.$refs.month.getMonthData()
        } else if (label === 'year') {
          this.$refs.year.getYearData()
        }
      },
      go2DayMeeting(day) {
        this.day = day
        this.tabValue = 'day'
        this.$nextTick(() => {
          this.radioChange(this.tabValue)
        })
      },
      roomChange() {
        this.radioChange(this.tabValue)
      },
      getRoomData() {
        api.meetingRoom.paged({
          page: 1,
          pageSize: 999,
          agencyId: this.$store.state.agencyId
        }).then(data => {
          this.formOptions.roomId = data.records.map(r => ({
            label: r.name,
            value: r.id,
            projectionValue: r.projectionValue,
            capacity: r.capacity
          }))
        })
      }
    },
    mounted() {
      this.radioChange(this.tabValue)
      this.getRoomData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.center-wrap
  width: 100%
  height: 100%
.east-wrap
  width: 100%
  height: 100%
  background: #eee
  padding: 5px
  box-sizing: border-box
.input-wrapper
  .label
    font-size: 14px
    margin: 0 5px
  .select
    width: 150px
</style>

