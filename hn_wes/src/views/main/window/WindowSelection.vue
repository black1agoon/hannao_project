<template>
  <div class="selection" :style="{width: width + 'px'}">
    <div class="selects">
      <div class="value" tabindex="1" :title="getLabel" @click="toggleShow">{{getLabel}}</div>
    </div>
    <ul v-show="show">
      <li v-for="(item, index) in options"
          :class="{active: item.value === value}"
          :key="index"
          :title="item.label"
          :tabIndex="index"
          @click="check(item.value)">{{item.label}}
      </li>
      <!--<div class="mask"></div>-->
    </ul>
    <div :class="['arrow', {rotate: show}]" @click="toggleShow">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'window-selection',
    props: {
      width: {
        type: Number,
        default: 290
      },
      options: {
        type: Array,
        default: () => []
      },
      value: [String, Number]
    },
    computed: {
      getLabel() {
        let select = this.options.find(op => op.value === this.value)
        return select ? select.label : ''
      }
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      toggleShow(e) {
        this.show = !this.show
      },
      check(val) {
        if (val !== this.value) {
          this.$emit('input', val)
          this.$emit('change', val)
        }
        this.show = false
      },
      judge(event) {
        let e = event || window.event
        let bubbling = (ele) => {
          if (ele.classList.contains('selection')) {
            return
          } else if (ele.parentElement) {
            bubbling(ele.parentElement)
          } else if (!ele.parentElement) {
            this.show = false
          }
        }
        bubbling(e.target)
      }
    },
    mounted() {
      document.addEventListener('click', this.judge)
    },
    destroyed() {
      document.removeEventListener('click', this.judge)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .selection
    position: relative
    height: 81px
    color: #ffffff
    font-size: 26px
    display: flex
    background-image: url("../../../assets/img/main/selectionbox.png")
    background-size: 100% 81px
    background-repeat: no-repeat
    .selects
      display: inline-block
      width: 240px
      height: 81px
      line-height: 88px
      text-align: center
      position: relative
      .value
        width: 100%
        padding-left: 15px
        font-size: 26px
        height: 81px
        color: #81D5E5
        box-sizing: border-box
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        outline: none
        cursor: pointer
    ul
      position: absolute
      /*overflow: hidden*/
      width: calc(100% - 6px)
      top: 68px
      left: 0
      text-align: center
      box-sizing: border-box
      background: url("../../../assets/img/main/selectionline.png"),
          linear-gradient(180deg, rgba(1, 10, 27, 1) 0%, rgba(41, 54, 107, 1) 100%)
      background-size: cover
      background-position: bottom
      z-index: 10
      clip-path: polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px))
      padding-bottom: 3px
      li
        margin: 0 2px 0
        height: 52px
        line-height: 52px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        color: #81D5E5
        cursor: pointer
        &:active, &.active
          background: #1C416B
        &:last-child
          clip-path: polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 40px)
      .mask
        position: absolute
        width: 1000px
        height: 500px
        background: #ff5d75
        top: 0
        transform: rotate(45deg)
    .arrow
      position: absolute
      top: 38px
      right: 28px
      width: 0
      height: 0
      cursor: pointer
      border-bottom: 14px solid #14CAEB
      border-left: 8px solid transparent
      border-right: 8px solid transparent
      transition: all .2s
      &.rotate
        transform: rotate(180deg)
        transform-origin: center
</style>