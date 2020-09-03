<template>
  <div class="next-wrapper">
    <div class="wrap" v-if="show">
      <div class="start-time">
        <div class="clock"></div>
        <div class="time">{{getTime}}</div>
      </div>
      <div class="field">
        <div class="title"><i class="fa fa-flag"></i>会议名称</div>
        <div class="value">{{meetingDetail.theme}}</div>
      </div>
      <div class="field">
        <div class="title"><i class="fa fa-bookmark"></i>会议地点</div>
        <div class="value">{{meetingDetail.roomName}}</div>
      </div>
      <div class="field">
        <div class="title"><i class="fa fa-user-circle"></i>发起人</div>
        <div class="value">{{meetingDetail.promoterName}}</div>
      </div>
      <div class="field">
        <div class="title"><i class="fa fa-clock-o"></i>时间</div>
        <div class="value">{{meetingDetail.orderStartTime}} ~ {{meetingDetail.orderEndTime}}</div>
      </div>
      <div class="field">
        <div class="title"><i class="fa fa-users"></i>参会人员</div>
        <div class="value">{{meetingDetail.attendeeNames}}</div>
      </div>
      <div class="field" v-show="meetingDetail.files">
        <div class="title"><i class="fa fa-users"></i>附件</div>
        <div class="files">
          <div class="filename"
               v-for="(filename, i) in fileNames"
               :key="i">
            <a target="_blank" :href="getFileHref(i)">{{filename}}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="no-meeting" v-else>暂无下次会议</div>
  </div>
</template>

<script>
  import config from '@/config'
  export default {
    name: 'next-meeting-block',
    props: {
      api: Function
    },
    computed: {
      getTime() {
        let date = new Date(this.meetingDetail.orderStartTime)
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours() + ''
        let minutes = date.getMinutes() + ''
        let wk = date.getDay()
        let week = ['日', '一', '二', '三', '四', '五', '六']
        return `下次会议将于${month}月${day}日 (周${week[wk]}) ${('00' + hour).substr(hour.length)} : ${('00' + minutes).substr(minutes.length)}召开`
      },
      fileNames() {
        return this.meetingDetail.fileNames ? this.meetingDetail.fileNames.split(',') : []
      }
    },
    data() {
      return {
        meetingDetail: {},
        show: true
      }
    },
    methods: {
      getNextMeeting() {
        this.api().then((data) => {
          this.show = false
          if (data) {
            this.meetingDetail = data
            this.show = true
          } else {
            this.show = false
          }
        })
      },
      getFileHref(i) {
        let filepathList = this.meetingDetail.files.split(',')
        return config.serverURI + config.prev + filepathList[i]
      }
    },
    mounted() {
      this.getNextMeeting()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.next-wrapper
  font-family: 'pingfang'
  .wrap
    height: 100%
    background: #fff
    border: 1px solid #efefef
    overflow-y: auto
    .start-time
      display: flex
      margin: 20px
      .clock
        width: 31px
        height: 31px
        background-image: url("../../../assets/img/clock.png")
        background-size: 31px 31px
        background-repeat: no-repeat
        margin-right: 5px
      .time
        flex: 1
        line-height: 16px
        font-size: 13px
    .field
      margin: 0 20px
      padding: 15px 0
      border-top: 1px solid #efefef
      .title
        font-size: 13px
        color: #c2c2c2
        margin-bottom: 5px
        i
          margin-right: 5px
      .value
        line-height: 20px
        font-size: 13px
        word-break: break-all
      .files
        display: flex
        flex-wrap: wrap
        line-height: 28px
        .filename
          white-space: nowrap
          margin-right: 10px
          a
            color: #000
            font-size: 13px
            text-decoration: underline
  .no-meeting
    height: 100%
    background: #fff
    border: 1px solid #efefef
    padding: 10px
</style>