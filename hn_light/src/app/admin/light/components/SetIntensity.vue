<template>
  <div class="bar-box">
    <div class="select" @click="toggleShowBar">
      <div class="value">{{showValue}}</div>
      <div class="arrow">
        <i :class="['arr','fa fa-angle-down', {rotate: show}]"></i>
      </div>
    </div>
    <transition name="show">
      <div class="bar-wrap" v-show="show">
        <div ref="bar" class="bar">
          <div ref="process" class="process" :style="getPercentWidth"></div>
          <span ref="btn" class="btn"  :style="getBtnLeft" @mouseup="trigger"></span>
        </div>
        <div class="btns">

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'set-intensity',
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    computed: {
      showValue() {
        return this.value !== 0 ? `${this.value}%` : ''
      },
      getPercentWidth() {
        return {
          width: 150 * this.value / 100 + 'px'
        }
      },
      getBtnLeft() {
        return {
          left: 150 * this.value / 100 - 7 + 'px'
        }
      }
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      toggleShowBar() {
        this.show = !this.show
      },
      ondrag(pos, x) {
        let process = this.$refs.process
        process.style.width = Math.max(0, x) + 'px'
        this.$emit('input', pos)
      },
      judge(event) {
        let e = event || window.event
        let ele = this.$el
        if (ele.contains(e.target)) {
          return false
        } else {
          this.show = false
        }
      },
      trigger(e) {
        if (e.which === 1) {
          this.$emit('trigger')
        }
      },
    },
    mounted() {
      let bar = this.$refs.bar
      let btn = this.$refs.btn
      btn.onmousedown = (e) => {
        let x = (e || window.event).clientX    // x => 鼠标点下去 离浏览器窗口左边X轴距离  790
        let max = bar.offsetWidth // - btn.offsetWidth   // max => 滚动条长度-按钮长度
        let l = btn.offsetLeft                // l => 按钮 距离左侧距离  -7
        document.onmousemove = (e) => {
          let thisX = (e || window.event).clientX
          let to = Math.min(max -7, Math.max(-7, l + (thisX - x)))
          btn.style.left = to + 'px'
          this.ondrag(Math.round(Math.max(0, (to + 7) / max) * 100), to + 7)

          window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
        }
        document.onmouseup = (event) => {
          document.onmousemove = null
          event.stopPropagation()
        }
      }
      document.addEventListener('click', this.judge)
    },
    destroyed() {
      document.removeEventListener('click', this.judge)
    },
    watch: {
      'show'() {
        if (!this.show) {
          this.$emit('trigger')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .bar-box
    width: 150px
    position: relative
    display: inline-block
    cursor: pointer
    height: 26px
    line-height: 26px
    border-radius: 4px
    border: 1px solid #dcdfe6
    vertical-align: middle
    &:hover
      border-color: #c0c4cc
    .select
      padding: 0 30px 0 18px
      display: flex
      height: 26px
      .value
        font-size: 14px
        color: rgb(2, 2, 2)
      .arrow
        position: absolute
        right: 5px
        width: 25px
        text-align: center
        color: #c0c4cc
        font-size: 19px
        .rotate
          transition: all .2s
          transform: rotate(-180deg)
          transform-origin: center
    .bar-wrap
      width: 170px
      height: 23px
      position: absolute
      top: 30px
      z-index: 10
      transition: all .1s linear
      overflow: hidden
      background: #3f4346
      &.show-enter, &.show-leave-to
        height: 0
      .bar
        width: 150px
        height: 3px
        background: #ffffff
        position: relative
        margin: 10px 0 0 10px
        .btn
          position: absolute
          top: -5px
          left: -7px
          cursor: pointer
          display: block
          width: 15px
          height: 17px
          background-image: url("../../../../assets/img/barbtn.png")
          background-size: 15px 17px
          background-repeat: no-repeat
        .process
          background: #66D9EF
          width: 0
          height: 3px
</style>