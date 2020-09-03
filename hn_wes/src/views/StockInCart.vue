<template>
  <div :class="['board-wrapper', {completed}]">
    <template v-if="!completed">
      <div class="orderName">
        <p class="cn">{{getTitle.cn}}</p>
        <p class="en">{{getTitle.en}}</p>
        <span class="countdown" v-show="countdown > 0 && !checkWages">{{countdown}}</span>
      </div>
      <ul class="stockdata">
        <!--<li class="recommend">-->
        <!--<label>推荐库位</label>-->
        <!--<span class="val">A10C</span>-->
        <!--</li>-->
        <li>
          <label>包数</label>
          <span class="val">{{getBaoshu}}</span>
        </li>
        <li>
          <label>袜子数</label>
          <span class="val">{{getCurrentQty}}</span>
        </li>
      </ul>
      <div class="showpic">
        <img class="man" src="../assets/img/stockinman.png"/>
        <img class="arrow" src="../assets/img/stockinarrow.png"/>
        <img class="box" src="../assets/img/stockinbin.png"/>
        <p class="descript">
          <!--<span class="desc">货物编号</span>-->
          <!--<span class="num">MS162703</span>-->
        </p>
        <img class="boxshadow" src="../assets/img/stoctinboxshadow.png"/>
      </div>
    </template>
    <template v-else>
      <p class="text">{{getTitle.cn}}</p>
      <div class="failed" v-show="checkWg">
        <p>错误的提示：有未设置</p>
        <p>计件工资的生产明细</p>
      </div>
      <ul class="stockdata2" v-show="!checkWages">
        <li class="logo">
          <img src="../assets/img/huowu.png"/>
        </li>
        <li>
          <label>包数</label>
          <p class="val">{{getBaoshu}}</p>
        </li>
        <li class="logo">
          <img src="../assets/img/wazi.png"/>
        </li>
        <li>
          <label>袜子数</label>
          <p class="val">{{getCurrentQty}}</p>
        </li>
      </ul>
      <div class="showpic2">
        <div v-if="!showCloud" class="picwrap">
          <img id="image" ref="image"/>
        </div>
        <img v-else class="cloud" src="../assets/img/stockincloud.png">
        <p class="upload">已上传服务器</p>
        <div class="hasdone">
          <img src="../assets/img/stockinarrow2.png"/>
          <p class="done">本次入库完成</p>
        </div>
      </div>
    </template>

    <div class="box-wrap">
      <div class="content">
        <ul class="table-title">
          <template v-if="checkWg">
            <li>序号</li>
            <li>生产单号</li>
            <li class="no">款号</li>
            <li>主色</li>
            <li>花型</li>
            <li>尺码</li>
          </template>
          <template v-else>
            <li>序号</li>
            <li>单据号</li>
            <li class="no">款号</li>
            <li>花型</li>
            <li>尺码</li>
            <li>数量</li>
          </template>
        </ul>
        <div class="scroll-box">
          <div class="table" :style="{marginTop: stocklist.length > 16 ? '-55px' : 0}">
            <ul :class="['item', rowClasses, {deepcolor: !item._ids, redColor: item.DateStatus !== 1}]"
                v-for="(item, index) in viewList"
                @animationend="onSlidingEnd"
                :key=index>
              <template v-if="!checkWg">
                <template v-if="item.DateStatus !== 3">
                  <li>{{item.index}}</li>
                  <li>{{item.PBoxCode}}</li>
                  <li class="no" :title="item.factory_desc">{{item.factory_desc}}</li>
                  <li>{{item.colorName}}</li>
                  <li>{{item.size}}</li>
                  <li>{{item.CurrentQty}}</li>
                </template>
                <template v-else>
                  <li>{{item.index}}</li>
                  <li>{{item.Rfid}}</li>
                  <li>无卡信息</li>
                </template>
              </template>
              <template v-else>
                <li>{{item.index}}</li>
                <li>{{item.PTaskCode}}</li>
                <li class="no">{{item.ProductCode}}</li>
                <li>{{item.ColorMain}}</li>
                <li>{{item.ColorName}}</li>
                <li>{{item.Psize}}</li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {getImgUrl} from '../assets/js/utils'

  export default {
    name: 'stockin-cart',
    computed: {
      ...mapState([
        'stocklist',
        'showWaitTime',
        'checkWages',
        'flowCode'
      ]),
      checkWg() {
        return this.checkWages && this.stocklist.find(sk => sk.ResType === 2)
      },
      statusResType1() {  // 返回状态为1 的最后一条数据后，立刻结束
        return this.stocklist.find(sk => sk.ResType === 1)
      },
      filllist() {
        // if (this.checkWg) {
        //   let dolist = this.stocklist.find(sk => sk.ResType === 2)
        //   if (dolist.DoCheckWagesOutputList.length > 16 && dolist.DoCheckWagesOutputList % 2 !== 0) {
        //     return dolist.DoCheckWagesOutputList.concat(dolist.DoCheckWagesOutputList)
        //   } else {
        //     return dolist.DoCheckWagesOutputList
        //   }
        // } else {
        //   let list = this.stocklist.slice()
        //   if (list[list.length - 1].ResType === 1) {
        //     list.pop()
        //   }
        //   if (list.length > 16 && list % 2 !== 0) {
        //     return list.concat(list)
        //   } else {
        //     return list
        //   }
        // }
        if (this.checkWg) {
          let dolist = this.stocklist.find(sk => sk.ResType === 2)
          return dolist.DoCheckWagesOutputList
        } else {
          let list = this.stocklist.slice()
          if (list[list.length - 1].ResType === 1) {
            list.pop()
          }
          return list
        }
      },
      viewList() {
        if (this.filllist.length <= 16) {
          return this.filllist.concat(Array.from({length: 16 - this.filllist.length}, () => ({}))).map((item, idx) => ({
            _ids: idx % 2,
            index: Object.keys(item).length > 0 ? idx + 1 : null,
            ...item
          }))
        } else if (this.filllist.length > 16) {
          let list = this.filllist.slice()
          if (this.filllist.length % 2 !== 0) {
            list.push({})
          }
          list = list.map((item, idx) => ({
            ...item,
            index: Object.keys(item).length > 0 ? idx + 1 : null
          }))
          return list.concat(list).map((item, idx) => ({
            _ids: idx % 2,
            ...item
          })).slice(this.currentRow)
        } else {
          return []
        }
      },
      getTitle() {
        if (this.stocklist.length > 0 && this.stocklist[0].StoType === 2 && !this.completed) {
          return {
            cn: '正在出库',
            en: 'STOCKOUT'
          }
        } else if (this.stocklist.length > 0 && this.stocklist[0].StoType === 1 && !this.completed) {
          return {
            cn: '正在入库',
            en: 'LOADING'
          }
        } else if (this.stocklist.length > 0 && this.stocklist[0].StoType === 2 && this.completed) {
          return {
            cn: this.checkWg ? '出库失败' : '出库结束'
          }
        } else if (this.stocklist.length > 0 && this.stocklist[0].StoType === 1 && this.completed) {
          return {
            cn: this.checkWg ? '入库失败' : '入库结束'
          }
        } else {
          return {
            // cn: 'error'
          }
        }
      },
      getCurrentQty() {
        return this.stocklist.filter(sk => sk.DateStatus === 1).reduce((sum, cur) => {
          return sum + cur.CurrentQty
        }, 0)
      },
      getBaoshu() {
        return this.stocklist.filter(sk => sk.DateStatus === 1).length
      },
      rowClasses() {
        return {
          'kira-slide-in-up': this.isSliding,
        }
      },
      rowCount() {
        return this.filllist.length
      }
    },
    data() {
      return {
        getImgUrl,
        isSliding: false,
        slidingId: 0,
        currentRow: 0,
        completed: false,
        timer: null,
        timer_cd: null,
        timer_rdt: null,
        countdown: Number(this.$store.state.showWaitTime),
        showCloud: false
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
          this.slidingId = null
        }
      },
      setCompletedStatus() {
        if (!this.completed) {
          this.timer_cd = setInterval(() => {
            if (--this.countdown === 0 || this.checkWg || this.statusResType1) {
              this.cleartimer()
              this.completed = true
              this.$nextTick(() => {
                this.getPictureStatus()
                this.redirect()
              })
            }
          }, 1000)
        }
      },
      cleartimer() {
        clearInterval(this.timer_cd)
        clearInterval(this.timer_rdt)
        this.timer_cd = null
        this.timer_rdt = null
      },
      getPictureStatus() {
        if (this.stocklist.length > 0) {
          let img = this.$refs.image
          img.onload = () => {
            this.showCloud = false
          }
          img.onerror = () => {
            this.showCloud = true
          }
          img.src = getImgUrl(this.stocklist[0].PicName)
        } else {
          this.showCloud = true
        }
      },
      redirect() {
        this.timer_rdt = setInterval(() => {
          this.$router.push('/storageconsole')
          // this.$destroy(true)
        }, 50 * 60 * 1000)
      }
    },
    mounted() {
    },
    destroyed() {
      // console.log('cart destroyed')
      this.stopSliding()
      this.cleartimer()
    },
    watch: {
      stocklist: {
        immediate: true,
        handler: function () {
          // console.log(this.stocklist[0].FlowCode, this.flowCode)
          if (this.stocklist[0].FlowCode !== this.flowCode) {
            this.countdown = Number(this.$store.state.showWaitTime)
            this.$store.commit('SET_FLOWCODE', this.stocklist[0].FlowCode)
            window.localStorage.setItem('flowCode', this.stocklist[0].FlowCode)
          }
          this.completed = false
          this.cleartimer()
          this.setCompletedStatus()
          if (this.stocklist.length > 16) {
            this.startSliding()
          } else {
            this.stopSliding()
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../assets/stylus/scroll.styl'
  .board-wrapper
    position: absolute
    width: 1920px
    height: 1080px
    background-image: url("../assets/img/bg-stockin.png")
    background-size: 1920px 1080px
    background-repeat: no-repeat
    overflow: hidden
    &.completed
      background-image: url("../assets/img/bg-stockin2.png")
    .orderName
      position: absolute
      top: 35px
      width: 668px
      font-family: 'HYWenHei'
      color: #ffffff
      text-align: center
      .cn
        font-size: 42px
      .en
        margin-top: 10px
        font-size: 14px
      .countdown
        position: absolute
        top: -10px
        left: 500px
        color: #00E5FA
        font-size: 80px
    .showpic, .showpic2
      position: absolute
      width: 757px
      left: 73px
      top: 247px
      .man
        display: block
        margin: 0 auto
        width: 174px
        height: 288px
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
        margin: 37px auto 0
        width: 79px
        height: 101px
      .box
        position: relative
        display: block
        margin: 61px auto 0
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
      .cloud
        margin: 120px 0 40px 40px
      .upload
        color: #01D2E6
        font-size: 36px
        padding-left: 210px
      .hasdone
        position: absolute
        bottom: 188px
        right: 10px
        text-align: center
        .done
          margin-top: 20px
          font-size: 22px
          color: #ffffff
      .picwrap
        margin: 120px 0 40px 40px
        width: 583px
        height: 407px
        background-image: url("../assets/img/picbox.png")
        background-size: 583px 407px
        background-repeat: no-repeat
        text-align: center
        img
          width: 514px
          height: 340px
          margin-top: 32px
    .showpic2
      top: 400px
      left: 94px
    .stockdata
      position: absolute
      width: 988px
      display: flex
      top: 120px
      left: 100px
      /*justify-content: space-between*/
      li
        width: 300px
        height: 113px
        background-image: url("../assets/img/stockindata.png")
        background-size: 300px 113px
        background-repeat: no-repeat
        margin-right: 75px
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
    .text
      position: absolute
      top: 213px
      left: 219px
      font-size: 82px
      color: #01D2E6
    .failed
      font-size: 45px
      color: red
      position: absolute
      top: 360px
      left: 160px
      p
        text-align: center
        line-height: 55px
    .stockdata2
      position: absolute
      width: 988px
      display: flex
      top: 340px
      left: 115px
      label
        color: #92969A
        font-size: 28px
      .val
        margin-top: 20px
        color: #ffffff
        font-size: 82px
        font-family: 'Teko-Regular'
      .logo
        margin: 30px 20px 0 80px
    .box-wrap
      position: absolute
      bottom: 51px
      right: 66px
      width: 988px
      height: 961px
      background-image: url("../assets/img/stockinbox.png")
      background-size: 988px 961px
      background-repeat: no-repeat
      .content
        .table-title
          display: flex
          height: 55px
          line-height: 55px
          margin: 11px 0
          li
            flex: 1
            list-style: none
            font-size: 25px
            color: #94F0FD
            text-align: center
            &.no
              flex: 1.5
        .scroll-box
          height: 880px
          /*height: 295px*/
          overflow: hidden
          .table
            .item
              display: flex
              height: 55px
              line-height: 55px
              font-size: 20px
              text-align: center
              color: #ffffff
              &.deepcolor
                background: rgba(14, 95, 183, .3)
              &.redColor
                color: red
              li
                flex: 1
                font-size: 22px
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                &.no
                  flex: 1.5
</style>