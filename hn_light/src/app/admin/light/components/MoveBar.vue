<template>
  <div class="bar-box">
    <div class="select">
      <div class="value">{{value + '%'}}</div>
      <div :class="['arrow', {pointer: clickAble}]" @click="toggleShowBar">
        <i :class="['arr','fa fa-angle-down', {rotate: show}]"></i>
      </div>
    </div>
    <div class="bar-wrap" v-show="show">
      <div ref="bar" class="bar">
        <div ref="process" class="process" :style="getPercentWidth"></div>
        <span ref="btn" class="btn"  :style="getBtnLeft"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'move-bar',
    props: {
      value: {
        type: Number,
        default: 0
      },
      clickAble: {
        type: Boolean,
        default: true
      }
    },
    computed: {
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
        if (this.clickAble) {
          this.show = !this.show
        }
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
      }
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
    width: 50px
    position: relative
    display: inline-block
    .select
      margin-top: 2px
      width: 50px
      height: 14px
      display: flex
      border-radius: 3px
      border: 1px solid rgba(63, 66, 69, 1)
      .value
        width: 40px
        font-size: 14px
        color: rgb(2, 2, 2)
        text-align: center
        border-right: 1px solid rgba(63, 66, 69, 1)
      .arrow
        position: relative
        font-size: 14px
        &.pointer
          cursor: pointer
        .rotate
          transform: rotate(180deg)
          transform-origin: center
    .bar-wrap
      width: 170px
      height: 23px
      background: #3f4346
      position: absolute
      top: 20px
      z-index: 10
      .bar
        width: 150px
        height: 3px
        background: #ffffff
        margin: 10px 0 0 10px
        position: relative
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