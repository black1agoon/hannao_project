<template>
  <div class="time">
    <span>{{ timeYMD }}</span>
    <span class="top-time">
        <span class="timeHM">{{ timeH }}</span>
        <i>&#58;</i>
        <span class="timeHM">{{ timeM }}</span>
      </span>
  </div>
</template>

<script>
  export default {
    name: 'datetime',
    data() {
      return {
        timeYMD: '',
        timeH: '',
        timeM: ''
      }
    },
    methods: {
      getTime() {
        const myDate = new Date()
        const Y = myDate.getFullYear() + '/'
        const M = (myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + '/'
        const D = myDate.getDate() < 10 ? '0' + (myDate.getDate()) + ' ' : myDate.getDate()
        const h = myDate.getHours() < 10 ? '0' + (myDate.getHours()) + ' ' : myDate.getHours()
        const m = myDate.getMinutes() < 10 ? '0' + (myDate.getMinutes()) + ' ' : myDate.getMinutes()
        this.timeYMD = Y + M + D
        this.timeH = h
        this.timeM = m
      }
    },
    mounted() {
      this.getTime()
      setInterval(() => {
        this.getTime()
      }, 30 * 1000)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.time
  position: absolute
  right: 48px
  display: flex
  height: 50px
  align-items: center
  color: #00F6FF
  font-size: 21px
  z-index: 10
.top-time
  display: flex
  margin-left: 20px
  line-height: 50px
.timeHM
  width: 50px
  padding-left: 9px
  letter-spacing: 12px
  background: url("../assets/img/time_bg.png") no-repeat left center
.top-time
  i
    padding-right: 10px
    font-style: normal
.bottom
  position: absolute
  right: 46px
  bottom: 10px
  font-size: 21px
  font-style: italic
  color: rgba(255,255,255, .3)
</style>