<template>
  <div class="selection" :style="{width: width + 'px'}">
    <div class="selects">
      <div class="value" tabindex="1" :title="getLabel" @click="toggleShow">{{getLabel}}</div>
    </div>
    <ul v-show="show">
      <li v-for="(item, index) in options"
          :key="index"
          :title="item.label"
          :tabIndex="index"
          @click="check(item.value)">{{item.label}}
      </li>
    </ul>
    <div :class="['arrow', {rotate: show}]" @click="toggleShow">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'selection',
    props: {
      width: {
        type: Number,
        default: 180
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
        show: false,
        selectValue: this.value
      }
    },
    methods: {
      toggleShow(e) {
        this.show = !this.show
      },
      check(val) {
        if (val !== this.selectValue) {
          this.selectValue = val
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
    height: 51px
    color: #ffffff
    font-size: 24px
    display: flex
    background-image: url("../../assets/img/depwrap.png")
    background-size: 100% 51px
    background-repeat: no-repeat
    .selects
      display: inline-block
      width: 90%
      height: 51px
      line-height: 51px
      text-align: center
      position: relative
      .value
        width: 100%
        padding-left: 15px
        font-size: 25px
        height: 51px
        color: #FF9600
        box-sizing: border-box
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        outline: none
        cursor: pointer
    ul
      position: absolute
      width: 90%
      top: 51px
      right: 0
      text-align: center
      box-sizing: border-box
      background: rgba(255, 150, 0, 0.2)
      border: 2px solid rgba(255, 150, 0, 1)
      z-index: 10
      li
        margin: 0 10px
        padding: 5px 0
        height: 30px
        line-height: 30px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        color: #FF9600
        border-bottom: 1px solid rgba(213, 213, 213, .2)
        cursor: pointer
        &:last-child
          border: none
    .arrow
      position: absolute
      top: 20px
      right: 10px
      width: 22px
      height: 11px
      background-image: url("../../assets/img/arrow.png")
      background-size: 22px 11px
      background-repeat: no-repeat
      cursor: pointer
      &.rotate
        transform: rotate(180deg)
        transform-origin: center
</style>