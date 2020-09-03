<template>
  <div class="board-wrapper">
    <div class="orderName">
      ABS102256<span class="status">入库中</span>
    </div>
    <div class="showpic">
      <img class="agv" src="../assets/img/stockinagv.png"/>
      <p class="descript">
        <span class="desc">AGV编号</span>
        <span class="num">K423</span>
      </p>
      <img class="arrow" src="../assets/img/stockinarrow.png"/>
      <img class="box" src="../assets/img/stockinbin.png"/>
      <p class="descript">
        <span class="desc">货物编号</span>
        <span class="num">MS162703</span>
      </p>
      <img class="boxshadow" src="../assets/img/stoctinboxshadow.png"/>
    </div>
    <ul class="stockdata">
      <li class="recommend">
        <label>推荐库位</label>
        <span class="val">A10C</span>
      </li>
      <li>
        <label>包数</label>
        <span class="val">4</span>
      </li>
      <li>
        <label>袜子数</label>
        <span class="val">1830</span>
      </li>
    </ul>
    <div class="box-wrap">
      <div class="content">
        <ul class="table-title">
          <li>包号</li>
          <li>订单号</li>
          <li>生产数</li>
        </ul>
        <div class="scroll-box">
          <ul class="item"
              v-for="(item, index) in fillList"
              :key=index>
            <li>{{item.no}}</li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'production-progress',
    computed: {
      fillList() {
        if (this.stockinList.length < 13) {
          return this.stockinList.concat(Array.from({length: 13 - this.stockinList.length}, () => ({})))
        } else {
          return []
        }
      }
    },
    data() {
      return {
        stockinList: [{
          no: 55555
        }]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../assets/stylus/scroll.styl'
  .board-wrapper
    position: relative
    width: 1920px
    height: 1080px
    background-image: url("../assets/img/bg-stockin.png")
    background-size: 1920px 1080px
    background-repeat: no-repeat
    .orderName
      position: absolute
      top: 35px
      left: 150px
      font-family: 'Teko-Regular'
      font-size: 82px
      color: #ffffff
      line-height: 52px
      height: 52px
      .status
        margin-left: 15px
        font-size: 30px
        color: #00B5CF
        line-height: 30px
        vertical-align: bottom
    .showpic
      position: absolute
      width: 757px
      left: 73px
      top: 197px
      .agv
        display: block
        margin: 0 auto
        width: 412px
        height: 196px
      .descript
        position: relative
        text-align: center
        margin: 22px 0 0 0
        z-index: 5
        .desc
          color: #FBFBF9
          opacity: 0.7
          font-size: 25px
          line-height: 30px
        .num
          color: #ffffff
          margin-left: 10px
          font-family: Teko-Regular
          font-size: 54px
          line-height: 36px
          vertical-align: bottom
      .arrow
        display: block
        margin: 75px auto 0
        width: 79px
        height: 101px
      .box
        position: relative
        display: block
        margin: 71px auto 0
        width: 285px
        height: 260px
        z-index: 5
      .boxshadow
        display: block
        position: absolute
        width: 757px
        height: 695px
        bottom: 0
        z-index: 2
    .stockdata
      position: absolute
      width: 988px
      right: 66px
      top: 35px
      display: flex
      justify-content: space-between
      li
        width: 300px
        height: 113px
        background-image: url("../assets/img/stockindata.png")
        background-size: 300px 113px
        background-repeat: no-repeat
        &.recommend
          width: 330px
          background-size: 330px 113px
        label
          display: inline-block
          margin: 45px 0 0 65px
          font-size: 24px
          color: #94F0FD
        .val
          margin-left: 15px
          color: #ffffff
          font-size: 42px
          line-height: 33px
          vertical-align: bottom
    .box-wrap
      position: absolute
      bottom: 68px
      right: 66px
      width: 988px
      height: 845px
      background-image: url("../assets/img/stockinbox.png")
      background-size: 988px 845px
      background-repeat: no-repeat
      .content
        .table-title
          display: flex
          height: 59px
          line-height: 59px
          margin: 11px 0
          li
            flex: 1
            list-style: none
            font-size: 25px
            color: #94F0FD
            text-align: center
        .scroll-box
          height: 767px
          overflow: hidden
          .item
            display: flex
            height: 59px
            line-height: 59px
            font-size: 20px
            text-align: center
            &:nth-of-type(2n + 1)
              background: rgba(14, 95, 183, .3)
            li
              flex: 1
              font-size: 22px
              color: #ffffff
</style>