<template>
  <div class="wrapper">
    <i class="flash"></i>
    <div class="progress-box">
      <ul class="box">
        <li class="block"
            v-for="block in 20"
            :key="block">
          <div v-if="block <= fullNumber" class="full-block"></div>
          <div v-if="(block === fullNumber + 1) && value % 5 !== 0" class="full-block" :style="partBlockStyle"></div>
        </li>
      </ul>
    </div>
    <span class="value">
      {{value}}%
    </span>
  </div>
</template>

<script>
  export default {
    name: 'progress-tool',
    props: {
      value: {
        type: Number,
        defalut: 0
      }
    },
    computed: {
      fullNumber() {
        return Math.floor(this.value / 5)
      },
      partBlockStyle() {
        return {
          width: this.value % 5 / 5 * 100 + '%'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapper
  .flash
    display: inline-block
    width: 26px
    height: 26px
    background-image: url("../assets/img/flash.png")
    background-size: 26px 26px
    background-repeat: no-repeat
  .progress-box
    display: inline-block
    width: 240px
    margin: 0 10px
    .box
      width: 100%
      display: flex
      justify-content: space-between
      .block
        width: 10px
        height: 26px
        background: #BEB4C3
        list-style: none
        border-radius: 2px
        overflow: hidden
        .full-block
          background: #534769
          height: 26px
  .value
    display: inline-block
    height: 30px
    line-height: 30px
    font-family: Teko
    font-size: 36px
    color: #534769
    vertical-align: top
    margin-top: 2px
</style>