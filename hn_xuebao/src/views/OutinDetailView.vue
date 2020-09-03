<template>
  <div class="wrapper">
    <div class="detailbox">
      <div class="cnStatus">正在{{stoTypeName}}</div>
      <div class="enStatus">LOADING...</div>
      <div class="label">当前单据号:</div>
      <div class="no">123456789012</div>
      <div class="sum">
        <div class="text">第</div>
        <div class="number">{{stockList.length}}</div>
        <div class="text">件</div>
      </div>
    </div>
    <div class="picbox">
<!--      <img :src="">-->
    </div>
    <div class="tablebox">
      <ul class="table-title">
          <li class="index">序号</li>
          <li class="code">条码号</li>
          <li class="style">款号</li>
          <li class="color">颜色</li>
          <li class="size">尺码</li>
      </ul>
      <div class="table-data">
        <div class="scroll" :style="{marginTop: stockList.length > 15 ? '-55px' : 0}">
          <ul class="row"
              :class="[rowClasses, {deep: item.deep}]"
              v-for="(item, index) in viewlist"
              :key="index"
              @animationend="onSlidingEnd">
            <li class="index">{{item.index}}</li>
            <li class="code">{{item.colorDetail}}</li>
            <li class="style">{{item.factory_desc}}</li>
            <li class="color">{{item.ColorMain}}</li>
            <li class="size">{{item.size}}</li>
          </ul>
        </div>
      </div>
    </div>
    <finish-window ref="finish">
    </finish-window>
    <error-window ref="error">
    </error-window>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import FinishWindow from './window/FinishWindow'
  import ErrorWindow from './window/ErrorWindow'
  export default {
    name: 'outin-detail-view',
    components: {
      FinishWindow,
      ErrorWindow
    },
    computed: {
      ...mapState([
        'stockList',
        'stoTypeName'
      ]),
      viewlist() {
        if (this.stockList.length <= 15) {
          return this.stockList.concat(Array.from({length: 15 - this.stockList.length}, () => ({}))).map((item, idx) => ({
            deep: idx % 2,
            index: Object.keys(item).length > 0 ? idx + 1 : null,
            ...item
          }))
        } else if (this.stockList.length > 15) {
          let list = this.stockList.slice()
          if (this.stockList.length % 2 !== 0) {
            list.push({})
          }
          list = list.map((item, idx) => ({
            ...item,
            index: Object.keys(item).length > 0 ? idx + 1 : null
          }))
          return list.concat(list).map((item, idx) => ({
            deep: idx % 2,
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
        return this.stockList.length % 2 === 0 ? this.stockList.length : this.stockList.length + 1
      }
    },
    data() {
      return {
        isSliding: false,
        slidingId: 0,
        currentRow: 0
      }
    },
    methods: {
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
      stockList: {
        immediate: true,
        handler: function () {
          if (this.stockList.length > 15) {
            this.startSliding()
          } else {
            this.stopSliding()
          }
          this.$store.commit('SET_STOTYPENAME', this.stockList.length > 0 && this.stockList[0].StoType === 1 ? '入库' : '出库')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../assets/stylus/scroll.styl'
.wrapper
  position: absolute
  width: 1920px
  height: 1080px
  top: 0
  left: 0
  color: #ffffff
  .detailbox
    position: absolute
    z-index: 2
    top: 118px
    left: 28px
    width: 675px
    height: 214px
    background-image: url("../assets/img/detailbox.png")
    background-size: 675px 214px
    background-repeat: no-repeat
    .cnStatus
      position: absolute
      left: 184px
      top: 65px
      font-size: 34px
      font-weight: bold
    .enStatus
      position: absolute
      left: 184px
      top: 110px
      color: #A2D4F8
      font-size: 13px
      font-weight: bold
      letter-spacing: 2px
    .label
      position: absolute
      top: 170px
      left: 190px
      color: #DBF0FF
      font-size: 24px
      font-weight: bold
    .no
      position: absolute
      top: 166px
      left: 350px
      color: #DBF0FF
      font-size: 30px
      font-weight: bold
      letter-spacing: 2px
    .sum
      position: absolute
      display: flex
      top: 64px
      left: 418px
      height: 70px
      align-items: center
      .text
        flex: 0 0 60px
        text-align: center
        font-size: 24px
        color: #A2D4F8
      .number
        flex: 0 0 100px
        margin: 0 10px
        text-align: right
        color: #94F0FD
        font-size: 70px
        font-family: digital-dismay
  .picbox
    position: absolute
    top: 370px
    left: 92px
    width: 650px
    height: 650px
    background-image: url("../assets/img/picbox.png")
    background-size: cover
  .tablebox
    position: absolute
    top: 91px
    left: 839px
    width: 1016px
    height: 923px
    background-image: url("../assets/img/tablebox.png")
    background-size: cover
    .table-title
      display: flex
      height: 98px
      align-items: center
      text-align: center
      color: #94F0FD
      font-size: 27px
    .table-data
      height: 825px
      overflow: hidden
      .row
        display: flex
        text-align: center
        height: 55px
        align-items: center
        font-size: 22px
        &.deep
          background: rgba(14, 95, 183, .15)
    .index
      flex: 0 0 132px
    .code
      flex: 0 0 188px
    .style
      flex: 0 0 233px
    .color
      flex: 0 0 310px
    .size
      flex: 1
</style>