<template>
  <div class="right">
    <div class="number">
      <img src="../../assets/img/kaoqin/number.png" alt="" style="margin-right: 21px">
      已签到
      <span :class="this.total.length===1?'number_special':'number_special_single'">{{this.total}}</span>
      人
    </div>
    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
      <div v-if="show" class="userlist" :key="i"
           style="position: absolute; top: 111px; left: 0; width: 100%; height: 100%;">
        <div class="users" v-for="(item,index) in this.userList_20" :key="index">
          <div class="user_img_on">
            <div style="width: 94px;height: 108px;margin: 8px 13px">
              <img :src="item.imageUrl" alt="">
              <div v-if="item.imageUrl===''" style="margin: 15px 0 0 13px">暂无照片</div>
            </div>
            <div :class="item.temperatureOver?'temperatureUnHealth':'temperatureHealth'">
              <span class="temperatureText">{{item.temperatureValue}}</span>
              <span class="temperatureIcon">℃</span>
            </div>
          </div>
          <div class="user_name">{{item.realName}}</div>
          <div style="display: flex;justify-content:center;margin-left: 20px;margin-top: 10px">
            <div :class="item.status===0?'ball_on':'ball_off'"></div>
            <div class="ball_wc" v-if="item.isWcMore"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import 'animate.css'

  export default {
    name: 'UserList',
    props: {
      userList: Array,
      total: Number,
    },
    data () {
      return {
        animated: false,
        show: true,
        intervalId: 0,
        userList_20: [],
        userTimer: null,
        i: 0,
      }
    },
    methods: {
      start () {
        this.i = 0
        this.userList_20 = this.userList.slice(this.i, this.i + 20)
        if (this.userList.length > 20) {
          this.slide()
        }
      },
      slide () {
        this.userTimer = window.setInterval(() => {
          this.i = (this.i + 20) > this.userList.length ? 0 : this.i + 20
          this.userList_20 = this.userList.slice(this.i, this.i + 20)
          window.setTimeout(() => {
            this.show = true
          }, 0)
        }, 20000)
      },
    },
    watch: {
      userList () {
        this.userList_20 = this.userList.slice(this.i, this.i + 20)
      },
    },
  }
</script>

<style scoped>
  .right {
    width: 1058px;
    height: 1017px;
    overflow: hidden;
    position: relative;
  }

  .number {
    float: right;
    color: #fff;
    font-size: 24px;
    font-family: 'Adobe Heiti Std R';
    margin-top: 21px;
    margin-right: 34px;
  }

  .number_special {
    color: #FFFB00;
    font-size: 48px;
    margin-right: 21px
  }

  .number_special_single {
    color: #FFFB00;
    font-size: 48px;
  }

  .userlist {
    width: 917px;
    height: 880px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 71px;
    position: relative;
    align-content: flex-start;
  }

  .users {
    position: relative;
    width: 120px;
    height: 215px;
    margin-right: 79px;
  }

  .userlist :nth-child(5n+5) {
    margin-right: 0 !important;
  }

  .user_img_on {
    width: 120px;
    height: 120px;
    border: solid 5px transparent;
    border-radius: 50%;
    background-image: linear-gradient(white, white),
    linear-gradient(#00FFEA, #00E105);
    background-origin: border-box;
    background-clip: content-box, border-box;
    overflow: hidden;
  }

  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .user_img_off {
    width: 120px;
    height: 120px;
    border: solid 5px transparent;
    border-radius: 50%;
    background-image: linear-gradient(white, white),
    linear-gradient(#F01F0F, #FF6D37);
    background-origin: border-box;
    background-clip: content-box, border-box;
    overflow: hidden;
  }


  .user_name {
    white-space: nowrap;
    text-align: center;
    margin-top: 12px;
    color: #fff;
    font-size: 22px;
  }

  .ball_on {
    width: 16px;
    height: 16px;
    background: linear-gradient(0deg, rgba(0, 225, 5, 1) 0%, rgba(0, 255, 234, 1) 100%);
    border-radius: 50%;
    margin-right: 20px;
  }

  .ball_wc {
    width: 16px;
    height: 16px;
    background: linear-gradient(0deg, #FFA700, #F0C200, #D8E100 100%);
    border-radius: 50%;
    margin-right: 20px;
  }

  .ball_off {
    width: 16px;
    height: 16px;
    background: linear-gradient(0deg, rgba(255, 109, 55, 1) 0%, rgba(240, 31, 15, 1) 100%);
    border-radius: 50%;
    margin-right: 20px;
  }

  .temperatureHealth {
    width: 120px;
    height: 40px;
    top: 90px;
    left: 60px;
    position: absolute;
    background-image: linear-gradient(to right, #00E105, #00F078, #00FFEA);
    border-radius: 24px 0 24px 0;
    text-align: center;
  }

  .temperatureUnHealth {
    width: 120px;
    height: 40px;
    top: 90px;
    left: 60px;
    position: absolute;
    background-image: linear-gradient(to right, #FFC137, #F74523, #F01F0F);
    border-radius: 12px 0 12px 0;
    text-align: center;
  }

  .temperatureText {
    font-size: 30px;
    color: #fff;
    font-family: '阿里巴巴普惠体 R', sans-serif;
  }

  .temperatureIcon {
    top: 0px;
    left: 92px;
    position: absolute;
    font-size: 22px;
    color: #fff;
    font-family: '阿里巴巴普惠体 R', sans-serif;
  }
</style>
