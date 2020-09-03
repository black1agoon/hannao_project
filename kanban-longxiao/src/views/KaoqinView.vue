<template>
  <div class="main">
    <div class="left">
      <div class="logo">
        <img src="../assets/img/kaoqin/hn.png" alt="" style="position: absolute;top: 12px;left: 0">
        <img src="../assets/img/kaoqin/logo.png" alt="" style="position: absolute;top: 7px;left: 374px">
      </div>

      <div class="clock_bac">
        <!--        动画zoomIn||slideInRight-->
        <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
          <new-clock v-if="showClock"></new-clock>
          <div class="card" v-if="showCard" :key="userList_one.id">
            <div class="topBac">
              <div class="year">{{timeDisplayArea}}</div>
              <div class="minutes">
                <img src="../assets/img/kaoqin/clock.png" alt="" style="position: absolute;left: 0;top:42px">
                <span style="position: absolute;top:43px;left: 57px;">{{this.time}}</span>
                <span style="position: absolute;top:43px;left: 366px;">{{week}}</span>
              </div>
            </div>
            <span class="sayHi">{{now}}</span>
            <span class="sayName">{{userList_one.realName}}</span>
            <div :class="userList_one.temperatureOver?'temperatureUnHealth':'temperatureHealth'">
              <span class="temperatureText">{{userList_one.temperatureValue}}</span>
              <span class="temperatureIcon">℃</span>
            </div>
            <div class="card_img">
              <img src="../assets/img/kaoqin/card_overdue.png" alt=""
                   v-if="this.userList_one.healthCardStatusName==='已过期'">
              <img src="../assets/img/kaoqin/card_change.png" alt=""
                   v-else-if="this.userList_one.healthCardStatusName==='待换证'">
              <img src="../assets/img/kaoqin/card_noupdata.png" alt=""
                   v-else-if="this.userList_one.healthCardStatusName==='待上传'">
              <img src="../assets/img/kaoqin/card.png" alt="" v-else>
            </div>
            <div class="card_in_title" :style="titleStyles">
              电子健康证
            </div>
            <div class="card_in_type">
              <img src="../assets/img/kaoqin/info_change.png" alt=""
                   v-if="this.userList_one.healthCardStatusName==='待换证'">
              <img src="../assets/img/kaoqin/info_overdue.png" alt=""
                   v-if="this.userList_one.healthCardStatusName==='已过期'">
            </div>
            <div class="card_in_img">
              <div class="noPhoto" v-if="userList_one.imageUrl===''">
                <div style="position: absolute;left:50px;top:40px ">暂无照片</div>
              </div>
              <img :src="userList_one.imageUrl" alt="">
            </div>
            <div class="card_in_1 card_in">
              <span>姓名：{{userList_one.realName}}</span>
              <span>年龄：{{userList_one.age|ageFilter}}</span>
            </div>
            <div class="card_in_2 card_in">
              <span>性别：{{userList_one.sexName||'-'}}</span>
              <span>类型：{{userList_one.typeName|typeFilter}}</span>
            </div>
            <div class="card_in_3 card_in">
              <span>颁发机构：{{userList_one.awardingBodies||'-'}}</span>
            </div>
            <div class="card_in_4">
              <span>证件有效期：{{userList_one.fromExpiryDate||'-'}}-{{userList_one.toExpiryDate||'-'}}</span>
            </div>
            <div class="zjhn">浙江汉脑数码科技有限公司提供技术支持</div>
          </div>
        </transition>
      </div>

    </div>
    <user-list ref="userList" class="right" :userList="this.userList" :total="this.total"></user-list>
  </div>
</template>

<script>
  import UserList from '@/components/kaoqin/UserList'
  import NewClock from '@/components/kaoqin/newClock'
  import Stomp from 'stompjs'
  import { rabbitMq, serverList } from '@/config'

  export default {
    name: 'KaoqinView',
    components: { UserList, NewClock },
    data () {
      return {
        updateTimer: null, // 更新时钟的timer
        userList: [],
        total: 0,
        showClock: true,
        showCard: false,
        userList_one: {},
        userList_one_arr: [],
        client: Stomp.client(rabbitMq.url),
        myTimeout: null,
        myInterval: null,
        i: 0,
        timer: '',
        time: '',
        week: '',
        now: '',
      }
    },
    filters: {
      ageFilter (age) {
        return age ? age + '岁' : '-'
      },
      typeFilter (typeName) {
        return typeName ? typeName.replace('健康证', '') : '-'
      },
    },
    methods: {
      formate () {
        // 处理时间格式
        let time1 = this.userList_one.fromExpiryDate.split('-')
        this.userList_one.fromExpiryDate = time1[0] + '年' + time1[1] + '月' + time1[2].substring(0, 2) + '日'
        let time2 = this.userList_one.toExpiryDate.split('-')
        this.userList_one.toExpiryDate = time2[0] + '年' + time2[1] + '月' + time2[2].substring(0, 2) + '日'
        this.userList_one.checkTime = this.userList_one.checkTime.replace(/^([\d-]+)[T ]([\d:]{5}).*/, '$1 $2')
      },
      getInfo () {
        this.$ajax.get(serverList.main + '/KanBan/KaoQin/GetDayKanBanKaoQin', {
          headers: {
            TenantId: 10,
          },
        }).then(res => {
          // 获取签到人数
          this.total = res.data.data.total
          // 获取人员信息
          this.userList = res.data.data.attendanceDayKaoQinList
          this.$nextTick(() => {
            this.$refs['userList'].start()
          })
        })
      },
      onConnected: function () {
        this.client.subscribe('kaoqinkanban', this.responseCallback, this.onFailed)
      },
      onFailed: function (frame) {
        console.log('MQ Failed: ' + frame)
      },
      responseCallback: function (frame) {
        //接收消息处理
        this.showClock = false
        this.showCard = true
        const now = new Date()
        const hour = now.getHours()
        if (hour < 6) {
          this.now = '凌晨好'
        } else if (hour < 9) {
          this.now = '早上好'
        } else if (hour < 12) {
          this.now = '上午好'
        } else if (hour < 14) {
          this.now = '中午好'
        } else if (hour < 17) {
          this.now = '下午好'
        } else if (hour < 19) {
          this.now = '傍晚好'
        } else if (hour < 22) {
          this.now = '晚上好'
        } else {
          this.now = '夜里好'
        }
        this.userList_one_arr.push(JSON.parse(frame.body))
        if (!this.userList.some(item => {
          if (item.id === JSON.parse(frame.body).id) {
            return true
          }
        })) {
          this.userList.push(JSON.parse(frame.body))
          this.total = this.total + 1
        }
        if (this.myInterval === null) {
          this.userList_one = this.userList_one_arr[0]
          this.formate()
          this.myInterval = setInterval(() => {
            this.i = this.i + 1
            this.userList_one = this.userList_one_arr[this.i]
            this.myTimeout = setTimeout(() => {
              this.showCard = true
            }, 0)
            if (this.i >= this.userList_one_arr.length) {
              this.userList_one_arr = []
              this.i = 0
              this.showClock = true
              this.showCard = false
              clearInterval(this.myInterval)
              this.myInterval = null
              clearTimeout(this.myTimeout)
              this.myTimeout = null
            }
          }, 5000)
        }
      },
      connect: function () {
        const headers = {
          login: rabbitMq.username,
          passcode: rabbitMq.password,
        }
        this.client.connect(headers, this.onConnected, this.onFailed)
      },
    },
    computed: {
      titleStyles () {
        const statusMap = {
          '已过期': '#FF2211',
          '待换证': '#FFBC00',
          '待上传': '#838484',
        }
        return { color: statusMap[this.userList_one.healthCardStatusName] || '#6DAC12' }
      },
      timeDisplayArea () { // 时间展示区
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let strDate = new Date().getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        return year + '年' + month + '月' + strDate + '日'
      },
    },
    created () {
      this.getInfo()
      window.setInterval(() => {
        this.getInfo()
      }, 180000)
      // 获取最新时间
      this.timer = setInterval(() => {
        let hours = new Date().getHours() > 9 ? new Date().getHours() : ('0' + new Date().getHours())
        let minutes = new Date().getMinutes() > 9 ? new Date().getMinutes() : ('0' + new Date().getMinutes())
        let min = new Date().getSeconds() > 9 ? new Date().getSeconds() : ('0' + new Date().getSeconds())
        let week = new Date().getDay()
        let weeks = ['日', '一', '二', '三', '四', '五', '六']
        let getWeek = '星期' + weeks[week]
        this.time = hours + ':' + minutes + ':' + min
        this.week = getWeek
      }, 1000)
      // 连接rabbitMQ
      this.connect()
    },
    watch: {
      userList_one () {
        if (this.i !== 0) {
          this.formate()
        }
      },
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
      }
    },
  }
</script>

<style scoped>
  .main {
    width: 1920px;
    height: 1080px;
    background: url("../assets/img/kaoqin/bac.png") no-repeat;
    display: flex;
    font-family: '阿里巴巴普惠体 R', sans-serif;
    overflow: hidden;
  }

  .left {
    width: 772px;
    height: 1019px;
    margin-top: 32px;
    margin-left: 30px;
  }

  .logo {
    width: 772px;
    height: 115px;
    position: relative;
  }

  .time {
    color: #48F3FA;
    font-size: 30px;
    position: absolute;
    top: 36px;
    left: 475px;
  }

  .clock_bac {
    width: 658px;
    height: 933px;
    position: relative;
    border-radius: 36px 36px 0 0;
  }

  .card {
    width: 658px;
    height: 933px;
    position: relative;
    border-radius: 36px 36px 0 0;
    background: #162D64;
  }

  .card_img {
    width: 520px;
    height: 358px;
    position: absolute;
    top: 465px;
    left: 60px;
    /*88 121*/
  }

  .card_in_img img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .noPhoto {
    width: 127px;
    height: 161px;
    writing-mode: vertical-lr;
    position: relative;
  }

  .card_in_title {
    position: absolute;
    color: #6DAC12;
    top: 511px;
    left: 241px;
    font-size: 30px;
  }

  .card_in_type {
    position: absolute;
    top: 514px;
    left: 459px;
  }

  .card_in_img {
    width: 127px;
    height: 161px;
    position: absolute;
    top: 557px;
    left: 127px;
    border: 1px #6EE3CA solid;
    border-radius: 8px;
  }

  .card_in {
    width: 260px;
    display: flex;
  }

  .card_in span {
    flex: 1 0 50%;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
  }

  .card_in_1 {
    position: absolute;
    color: #323232;
    top: 564px;
    left: 277px;
    font-size: 18px;
    /*196 338*/
  }

  .card_in_2 {
    position: absolute;
    color: #323232;
    top: 612px;
    left: 277px;
    font-size: 18px;
  }

  .card_in_3 {
    position: absolute;
    color: #323232;
    top: 660px;
    left: 277px;
    font-size: 18px;
  }

  .card_in_4 {
    position: absolute;
    color: #323232;
    top: 730px;
    left: 128px;
    font-size: 18px;
  }

  .card_info ul {
    list-style: none;
    margin: 0 auto;
    text-align: center;
  }

  .card_info ul li {
    background: url("../assets/img/kaoqin/line.png") no-repeat 137px;
    background-position-y: bottom;
    margin-bottom: 17px;
    padding-bottom: 8px;
  }

  .right {
    margin-top: 32px;
    margin-left: 30px;
  }

  .topBac {
    height: 190px;
    background: url("../assets/img/kaoqin/top_time.png") no-repeat;
  }

  .year {
    margin-left: 60px;
    padding-top: 20px;
    font-size: 30px;
    line-height: 36px;
    color: #fff;
    font-family: '阿里巴巴普惠体 R', sans-serif;
  }

  .minutes {
    margin-left: 60px;
    padding-top: 20px;
    font-size: 50px;
    line-height: 36px;
    color: #fff;
    font-family: '阿里巴巴普惠体 R', sans-serif;
    position: relative;
    font-weight: bold;
  }

  .sayHi {
    top: 220px;
    left: 60px;
    position: absolute;
    font-size: 50px;
    color: #00F2FC;
    font-family: '阿里巴巴普惠体 R', sans-serif;
  }

  .sayName {
    top: 301px;
    left: 60px;
    position: absolute;
    font-size: 90px;
    color: #fff;
    font-family: '阿里巴巴普惠体 R', sans-serif;
  }

  .temperatureHealth {
    width: 280px;
    height: 100px;
    top: 301px;
    left: 450px;
    position: absolute;
    background-image: linear-gradient(to right, #00E105, #00F078, #00FFEA);
    border-radius: 36px 0 36px 0;
    text-align: center;
  }

  .temperatureUnHealth {
    width: 280px;
    height: 100px;
    top: 301px;
    left: 450px;
    position: absolute;
    background-image: linear-gradient(to right, #FFC137, #F74523, #F01F0F);
    border-radius: 36px 0 36px 0;
    text-align: center;
  }

  .temperatureText {
    font-size: 80px;
    color: #fff;
    font-family: '阿里巴巴普惠体 R', sans-serif;
  }

  .temperatureIcon {
    top: 0px;
    left: 220px;
    position: absolute;
    font-size: 40px;
    color: #fff;
    font-family: '阿里巴巴普惠体 R', sans-serif;
  }
  .zjhn{
    position: absolute;
    font-size:16px;
    color: #fff;
    font-family: '阿里巴巴普惠体 R', sans-serif;
    text-align: center;
    top:899px;
    left: 181px;
  }
</style>
