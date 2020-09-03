<template>
  <div class="bar-wrap">
    <div class="contain">
      <div class="xaxis"></div>
      <div :class="['process', {finish: pss.bookJobQtySum === planNumber}]"
           v-for="(pss, idx) in barData"
           :style="getLeft(pss)"
           :key="idx">
        <template v-if="pss.bookJobQtySum !== planNumber">
          <p class="label">
            <span class="ft">完成数</span>
          </p>
          <p class="val">{{pss.bookJobQtySum | setNumByThree}}</p>
          <p class="label">
            <span class="ft">不合格数</span>
          </p>
          <p class="val error">{{pss.ungradedQtySum | setNumByThree}}</p>
          <p class="label">
            <span class="ft">合格率</span>
          </p>
          <p class="val pct">{{getPercent(pss.bookJobQtySum, pss.ungradedQtySum)}}%</p>
        </template>
        <p class="pccName"
           @mouseenter="showBarBlock($event)">
          {{pss.stepName}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {setNumberByThree} from '../../assets/js/utils'

  export default {
    name: 'order-progress-bar',
    props: {
      barData: {
        type: Array,
        default: () => []
      },
      planNumber: {
        type: Number,
        default: 50000
      }
    },
    filters: {
      setNumByThree(num) {
        return setNumberByThree(num)
      }
    },
    computed: {},
    data() {
      return {
      }
    },
    methods: {
      getLeft(pss) {
        return {
          left: pss.bookJobQtySum / this.planNumber * 100 + '%'
        }
      },
      getPercent(sum, other) {
        if (sum) {
          return (sum - other) / sum * 100 === 100 ? 100 :  ((sum - other) / sum * 100).toFixed(1)
        } else {
          return 0
        }
      },
      showBarBlock(event) {
        let process = document.getElementsByClassName('process')
        for(let i = 0; i < process.length; i++) {
          process[i].classList.remove('max')
        }
        event.target.parentNode.classList.add('max')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .bar-wrap
    .contain
      position: relative
      padding-left: 50px
      width: 439px
      height: 150px
      .process
        position: absolute
        width: 67px
        height: 102px
        top: 16px
        background-image: url("../../assets/img/main/orderinfobar.png")
        background-size: 67px 102px
        background-repeat: no-repeat
        padding: 6px 0
        box-sizing: border-box
        &.max
          z-index: 100
        &.finish
          margin-left: 45px
          width: 26px
          background-image: url("../../assets/img/main/barfinish.png")
          background-size: 26px 102px
        .label
          padding-right: 12px
          display: block
          white-space: nowrap
          margin-top: 3px
          color: #81D5E5
          .ft
            text-align: right
            display: block
            font-size: 12px
            transform: scale(0.67)
        .val
          color: #8AEDFF
          font-weight: bold
          font-size: 12px
          text-align: right
          padding-right: 22px
          &.error
            color: #FF5D75
          &.pct
            color: #02A9FA
        .pccName
          position: absolute
          bottom: -13px
          right: 20px
          color: #8AEDFF
          font-size: 12px
          white-space: nowrap
      .xaxis
        position: absolute
        top: 110px
        width: 489px
        height: 3px
        background: rgba(0, 132, 196, 0.43)
</style>