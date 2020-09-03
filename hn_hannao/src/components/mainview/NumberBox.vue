<template>
  <ul class="num-box">
    <li class="num"
        :style="{ color }"
        v-for="(num, index) in getString"
        :key="index">
      {{num}}
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'number-box',
    props: {
      number: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: '#FFD500'
      }
    },
    computed: {
      getString() {
        return ('000000' + this.number).substr(this.number.toString().length)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .num-box
    display: flex
    font-family: 'digital-dismay'
    .num
      width: 46px
      height: 70px
      padding-left: 4px
      box-sizing: border-box
      border-radius: 4px
      text-align: center
      line-height: 74px
      font-size: 80px
      background: rgba(216, 216, 216, .1)
      margin: 0 1px
</style>