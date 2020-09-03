<template>
  <div class="board-wrapper">
    <selection class="selection"
               v-model="depId"
               @change="depChange"
               :options="depList">
    </selection>
    <div class="avatar-wrap">
      <img v-if="firstUser.operatorImage" class="avatar pic" :src="getAvatar(firstUser.operatorImage)"/>
      <img v-else class="avatar" src="../assets/img/defaultavatar.png"/>
      <div class="avatar-box"></div>
    </div>
    <div class="topone">
      <ul class="detail">
        <li class="index">1</li>
        <li class="unit">st</li>
        <li class="userno">{{firstUser.operatorRealName}}</li>
        <li class="nums">
          <p>
            <span class="label">产量</span>
            <span class="value">{{firstUser.sumQty ? firstUser.sumQty : 0}}</span>
          </p>
          <p>
            <span class="label">合格</span>
            <span class="value">{{firstUser.passRate ? (firstUser.passRate * 100).toFixed() : 0}}%</span>
          </p>
        </li>
      </ul>
      <div class="time">
        <div class="label">保持时间</div>
        <flip-clock :time="keep.time">
        </flip-clock>
      </div>
    </div>
    <div class="ranklist">
      <ul class="rank"
          v-for="(user, index) in userList.slice(1)"
          :key="index">
        <li class="avatar">
          <img v-if="user.operatorImage" class="pic" :src="getAvatar(user.operatorImage)"/>
          <img v-else src="../assets/img/defaultavatar.png"/>
          <span class="index">{{index + 2}}</span>
        </li>
        <li class="userno">{{user.operatorRealName}}</li>
        <li class="nums">
          <p>
            <span class="label">产量</span>
            <span class="value">{{user.sumQty ? user.sumQty : 0}}</span>
          </p>
          <p>
            <span class="label">合格</span>
            <span class="value">{{user.passRate ? (user.passRate * 100).toFixed() : 0}}%</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import FlipClock from '../components/FlipClock'
  import {formatDate} from '../assets/common/util'
  import Selection from '../components/common/Selection'
  import config from '@/config'
  export default {
    name: 'rank-list',
    components: {
      FlipClock,
      Selection
    },
    computed: {
      firstUser() {
        if (this.userList.length > 0) {
          return this.userList[0]
        } else {
          return {}
        }
      }
    },
    data() {
      return {
        keep: {
          userid: null,
          time: '00:00:00'
        },
        depId: this.$store.state.depId,
        timer: null,
        timer2: null,
        userList: [],
        depList: []
      }
    },
    methods: {
      getAvatar(url) {
        return config.erpURI + url
      },
      timeflip() {
        let time = new Date('2020-01-01 ' + this.keep.time)
        // let time = new Date('2020-01-01 00:00:00')
        // console.log('time===============', time)
        this.timer = setInterval(() => {
          time = new Date(time.getTime() + 1000)
          this.keep.time = formatDate(time, 'hh:mm:ss')
          window.localStorage.setItem('keep', JSON.stringify(this.keep))
        }, 1000)
      },
      getKeeptime() {
        let keep = JSON.parse(window.localStorage.getItem('keep') || '{}')
        // 如果第一名没发生改变
        if (this.keep.userid !== keep.userid) {
          this.keep.time = '00:00:00'
          this.keep.userid = this.firstUser.operatorId
        } else {
          this.keep.time = keep.time ? keep.time : this.keep.time
          this.keep.userid = keep.userid ? keep.userid : this.keep.userid
        }
      },
      getApiData(depId) {
        return api.Spectaculars.getDeppartmentOperaterQtyRank(depId).then(data => {
          if (data && data.length > 0) {
            this.userList = data
            this.keep.userid = this.userList[0].operatorId
          } else {
            this.userList = []
          }
        })
      },
      getAllDep() {
        return api.Spectaculars.getBianzhiFengtouDep().then(data => {
          if (data && data.length > 0) {
            this.depList =  data.slice(0, 5).map(dep => ({
              label: dep.title,
              value: dep.id
            }))
            if (!this.depId) {
              this.depId = this.depList[0].value
            }
          } else {
            this.depId = null
            this.depList = []
          }
        })
      },
      depChange(val) {
        window.clearInterval(this.timer)
        window.localStorage.removeItem('keep')
        this.keep.time = '00:00:00'

        this.$store.commit('SET_DEPID', val)
        window.localStorage.setItem('depId', val)   // 保存选择的部门到本地

        this.getApiData(val).then(() => {
          this.getKeeptime()
          this.timeflip()
        })
      },
      failedPicReplace() {
        let els = document.getElementsByClassName('pic')
        els.forEach(img => {
          img.onerror = () => {
            img.src = require('../assets/img/defaultavatar.png')
          }
        })
      }
    },
    mounted() {
      this.getAllDep().then(() => {
        this.getApiData(this.depId).then(() => {
          this.getKeeptime()
          this.timeflip()
          this.failedPicReplace()
        })
      })
      // setTimeout(() => {
      //   this.$router.push('/workequip')
      // }, 60 * 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
      // clearInterval(this.timer2)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .board-wrapper
    position: absolute
    width: 1920px
    height: 1080px
    background-image: url("../assets/img/bg-ranklist.png")
    background-size: 1920px 1080px
    background-repeat: no-repeat
    color: #ffffff
    user-select: none
    overflow: hidden
    .selection
      position: absolute
      z-index: 10
      left: 500px
      top: 34px
    .avatar-wrap
      position: absolute
      left: 110px
      top: -50px
      width: 782px
      height: 842px
      .avatar-box
        position: absolute
        z-index: 5
        width: 782px
        height: 842px
        background-image: url("../assets/img/avatarbox.png")
        background-size: 782px 842px
        background-repeat: no-repeat
      .avatar
        position: absolute
        z-index: 1
        top: 250px
        left: 0
        right: 0
        margin: auto
        width: 494px
        height: 494px
        border-radius: 50%
    .topone
      position: absolute
      bottom: 80px
      left: 230px
      .detail
        li
          display: inline-block
          list-style: none
        .index
          font-size: 90px
          color: #FFDE00
          font-family: 'Teko-Regular'
          margin: 0 10px
        .unit
          font-size: 46px
          color: #D5D5D7
        .userno
          font-size: 64px
          margin: 0 25px 0 40px
        .nums
          line-height: 40px
          font-size: 26px
          text-align: left
          .value
            margin-left: 10px
            color: #02CCD4
      .time
        margin: 15px 0 0 30px
        .label
          display: inline-block
          font-size: 23px
          margin-right: 22px
          vertical-align: bottom
    .ranklist
      position: absolute
      right: 110px
      top: 90px
      width: 930px
      height: 960px
      display: flex
      flex-direction: column
      flex-wrap: wrap
      .rank
        display: flex
        align-items: center
        margin: 20px 0
        .avatar
          position: relative
          width: 90px
          height: 90px
          img
            width: 100%
            height: 100%
            border-radius: 50%
          .index
            display: block
            position: absolute
            bottom: -12px
            left: 33px
            width: 24px
            height: 24px
            line-height: 24px
            background: #FFDE00
            border-radius: 50%
            text-align: center
            color: #000000
            font-size: 15px
            font-weight: bold
        .userno
          font-size: 40px
          margin: 0 13px
        .nums
          line-height: 40px
          font-size: 26px
          text-align: left
          .value
            margin-left: 10px
            color: #02CCD4
    .mask
      position: absolute
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      background: rgba(0, 0, 0, .7)
      .tabs
        position: absolute
        width: 500px
        height: 70px
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto
        display: flex
        justify-content: space-between
        li
          width: 200px
          height: 70px
          line-height: 70px
          font-size: 35px
          text-align: center
          color: rgba(255, 255, 255, .6)
          border: 2px solid rgba(255, 255, 255, .6)
          border-radius: 10px
          &:hover
            color: rgba(255, 255, 255, 1)
            border: 2px solid rgba(255, 255, 255, 1)
</style>