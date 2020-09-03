<template>
  <transition name="fade">
    <div class="window" v-show="showflag">
      <div class="title">
        <img src="../../assets/img/error.png" />
        <span>{{stoTypeName}}异常</span>
      </div>
      <div class="window-box">
        <ul class="table-title">
          <li class="index">序号</li>
          <li class="code">条码号</li>
          <li class="style">款号</li>
          <li class="color">颜色</li>
          <li class="size">尺码</li>
          <li class="reason">异常原因</li>
        </ul>
        <div class="table-data">
          <div class="scroll" :style="{marginTop: this.list.length > 4 ? '-98px' : 0}">
            <ul class="row"
                :class="[rowClasses, {deep: item.deep}]"
                v-for="(item, index) in viewlist"
                :key="index"
                @animationend="onSlidingEnd">
              <li class="index">{{item.index}}</li>
              <li class="code">{{item.BarCode}}</li>
              <li class="style">{{item.StyleName}}</li>
              <li class="color">{{item.ColorName}}</li>
              <li class="size">{{item.SizeName}}</li>
              <li class="reason" :style="{color: COLORS[item.DataStatus]}">{{item.DataStatusName}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  const COLORS = {
    1: '#ff0000',
    3: '#ffff00',
    4: '#00ff00',
    5: '#00ffff'
  }
  export default {
    name: 'error-window',
    computed: {
      ...mapState([
        'stoTypeName',
        'windowMsg'
      ]),
      list() {
        return this.windowMsg.AbnormalDetailList ? this.windowMsg.AbnormalDetailList : []
      },
      viewlist() {
        if (this.list.length <= 4) {
          return this.list.concat(Array.from({length: 4 - this.list.length}, () => ({}))).map((item, idx) => ({
            deep: !(idx % 2),
            index: Object.keys(item).length > 0 ? idx + 1 : null,
            ...item
          }))
        } else if (this.list.length > 4) {
          let list = this.list.slice()
          if (this.list.length % 2 !== 0) {
            list.push({})
          }
          list = list.map((item, idx) => ({
            ...item,
            index: Object.keys(item).length > 0 ? idx + 1 : null
          }))
          return list.concat(list).map((item, idx) => ({
            deep: !(idx % 2),
            ...item
          })).slice(this.currentRow)
        } else {
          return []
        }
      },
      rowClasses() {
        return {
          'kira-slide-in-up': this.isSliding,
        }
      },
      rowCount() {
        return this.list.length % 2 === 0 ? this.list.length : this.list.length + 1
      }
    },
    data() {
      return {
        showflag: false,
        isSliding: false,
        slidingId: 0,
        currentRow: 0,
        COLORS
      }
    },
    methods: {
      show() {
        this.showflag = true
      },
      hide() {
        this.showflag = false
      },
      onSlidingEnd() {
        this.isSliding = false
      },
      startSliding() {
        if (!this.slidingId) {
          this.slidingId = window.setInterval(() => {
            this.currentRow = (this.currentRow + 1) % this.rowCount
            this.isSliding = true
          }, 2000)
        }
      },
      stopSliding() {
        if (this.slidingId) {
          window.clearInterval(this.slidingId)
        }
      }
    },
    mounted() {
    },
    destroyed() {
      this.stopSliding()
    },
    watch: {
      'windowMsg.State'() {
        if (this.windowMsg.State === 'Abnormal') {
          this.showflag = true
          this.currentRow = this.rowCount - 1
          if (this.list.length > 4) {
            this.startSliding()
          }
          setTimeout(() => {
            this.showflag = false
            this.$router.push('/outinstore')
            this.$store.commit('SET_WINDOWMSG', {})
          }, 500000000000 + 3 * 1000 * this.list.length)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../assets/stylus/scroll.styl'
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
    .title
      color: #FF0000
      position: absolute
      top: 180px
      left: 300px
      img
        vertical-align: top
      span
        display: inline-block
        margin-left: 40px
        vertical-align: top
        height: 83px
        font-size: 87px
        font-weight: bold
    .window-box
      position: absolute
      top: 180px
      right: 0
      left: 0
      bottom: 0
      margin: auto
      width: 1375px
      height: 617px
      background-image: url("../../assets/img/finishwindowbox.png")
      background-size: 1375px 617px
      background-repeat: no-repeat
      padding: 0 56px
      box-sizing: border-box
      .table-title
        display: flex
        height: 140px
        align-items: center
        text-align: center
        color: #94F0FD
        font-size: 27px
        margin-top: 20px
      .table-data
        height: 392px
        overflow: hidden
        .row
          display: flex
          text-align: center
          height: 98px
          align-items: center
          font-size: 28px
          &.deep
            background: rgba(14, 95, 183, .15)
          li
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
      .index
        flex: 0 0 80px
      .code
        flex: 0 0 200px
      .style
        flex: 0 0 233px
      .color
        flex: 0 0 350px
      .size
        flex: 0 0 130px
      .reason
        flex: 1
    .aaa
      color: #fff
</style>