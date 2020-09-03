<template>
  <div class="wrapper">
    <div class="box-wrap">
      <template v-for="(t, index) in time">
        <div v-if="t !== ':'"
             :key="'time' + index"
             class="box">
          {{t}}
        </div>
        <div v-else
             :key="'colon' + index"
             class="colon">:</div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'flip-clock',
    props: {
      time: {
        type: String,
        default: '00:00:00'
      }
    },
    data() {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapper
  width: 280px
  height: 55px
  display: inline-block
  font-family: 'Teko-Regular'
  .box-wrap
    display: flex
    align-items: center
    color: #06ECF5
    .colon
      font-size: 48px
      margin: 0 3px
    .box
      width: 34px
      height: 55px
      line-height: 60px
      text-align: center
      margin: 0 3px
      background-image: url("../assets/img/timebox.png")
      background-size: 34px 55px
      background-repeat: no-repeat
      font-size: 48px
</style>