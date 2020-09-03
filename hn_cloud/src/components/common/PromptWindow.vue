<template>
  <div class="mask-wrapper" v-show="show_">
    <div class="mask" @click="hide"></div>
    <div class="window" :style="{width: defaultOptions.width + 'px', height: defaultOptions.height + 'px'}">
      <div class="close" @click="() => {show_ = false}"></div>
      <div :class="['icon', defaultOptions.icon]"></div>
      <div class="font">{{defaultOptions.font}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'prompt-window',
    props: {
      options: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      defaultOptions() {
        return Object.assign({
          width: 300,
          height: 200,
          font: '',
          icon: 'success'
        }, this.options)
      }
    },
    data() {
      return {
        show_: false
      }
    },
    methods: {
      show() {
        this.show_ = true
      },
      hide() {
        this.show_ = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.mask-wrapper
  position: fixed
  top: 0
  width: 100%
  height: 100%
  .mask
    position: absolute
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, .25)
  .window
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    margin: auto
    background: #ffffff
    border-radius: 4px
    .close
      cursor: pointer
      position: absolute
      right: 12px
      top: 12px
      width: 11px
      height: 11px
      background-image: url("../../assets/img/cha.png")
      background-size: 11px 11px
      background-repeat: no-repeat
    .icon
      width: 62px
      height: 62px
      margin: 52px auto 21px
      background-size: 62px 62px
      background-repeat: no-repeat
      &.success
        background-image: url("../../assets/img/dui.png")
      &.error
        background-image: url("../../assets/img/cuowu.png")
    .font
      text-align: center
      color: rgba(67, 65, 65, 1)
      font-size: 16px
</style>