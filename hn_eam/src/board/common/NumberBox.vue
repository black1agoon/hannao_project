<template>
  <div class="number-box">
    <template v-for="(num, index) in formatNumber">
      <div class="box" :key="index">{{num}}</div>
      <div class="comma" v-if="index === 0 || index === 3" :key="'comma' + index">,</div>
    </template>
  </div>

</template>

<script>
  export default {
    name: 'number-box',
    props: {
      number: {
        type: Number,
        default: 0
      }
    },
    computed: {
      formatNumber() {
        let sNum = Math.round(this.number).toString()
        let length = sNum.length
        return ('0000000' + sNum).substr(length)
      }
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.number-box
  width: 390px
  height: 69px
  display: flex
  font-family: 'DIN-Medium'
  align-items: flex-end
  .box
    width: 43px
    height: 69px
    background-image: url("../static/img/numbox.png")
    background-size: 43px 69px
    background-repeat: no-repeat
    font-size: 60px
    margin: 0 4.5px
    line-height: 69px
    text-align: center
  .comma
    font-size: 30px
</style>