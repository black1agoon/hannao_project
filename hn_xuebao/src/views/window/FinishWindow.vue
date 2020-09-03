<template>
  <transition name="fade">
    <div class="window" v-show="showflag">
      <div class="window-box">
        <img class="icon" src="../../assets/img/finish_icon.png"/>
        <div class="status-name">{{stoTypeName}}完成</div>
        <div class="text-box">
          <div class="text">
            本次{{stoTypeName}}
            <span class="val">{{windowMsg.Number || 0}}</span>
            件
          </div>
<!--          <div class="text">-->
<!--            {{stoTypeName}}单号-->
<!--            <span class="no">PJ1910-2061</span>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'finish-window',
    computed: {
      ...mapState([
        'stockList',
        'stoTypeName',
        'windowMsg'
      ])
    },
    data() {
      return {
        showflag: false
      }
    },
    methods: {
      show() {
        this.showflag = true
      },
      hide() {
        this.showflag = false
      }
    },
    watch: {
      'windowMsg.State'() {
        if (this.windowMsg.State === 'Success') {
          this.showflag = true
          setTimeout(() => {
            this.showflag = false
            this.$router.push('/outinstore')
            this.$store.commit('SET_WINDOWMSG', {})
          }, 10000)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .window
    position: absolute
    width: 1920px
    height: 1080px
    background: rgba(0, 0, 0, .5)
    z-index: 100
    transition: all .3s

    &.fade-enter, &.fade-leave-to
      opacity: 0

    &.fade-enter-to, &.fade-leave
      opacity: 1

    .window-box
      position: absolute
      top: 0
      right: 0
      left: 0
      bottom: 0
      margin: auto
      width: 1155px
      height: 709px
      background-image: url("../../assets/img/finishwindowbox.png")
      background-size: 1155px 709px
      background-repeat: no-repeat

      .icon
        display: block
        width: 211px
        height: 211px
        margin: 70px auto 0

      .status-name
        font-size: 80px
        color: #A2D4F8
        text-align: center
        margin: 33px 0 44px

      .text-box
        width: 650px
        height: 185px
        margin: 0 auto
        border: 2px solid #3371C2
        background: #021C51

        .text
          font-size: 40px
          color: #A2D4F8
          margin: 50px 0 30px 153px

        .val
          font-size: 60px
          color: #ffffff
          margin: 0 30px
          font-weight: bold

        .no
          font-size: 40px
          color: #ffffff
          margin-left: 30px
</style>