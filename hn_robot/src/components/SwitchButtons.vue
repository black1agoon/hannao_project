<template>
  <div class="switch-wrapper" :class="{active: !status}">
    <div class="button enable"
         @click="enable"
         :class="{active: !status}">
      使能模式
    </div>
    <div class="button disenable"
         @click="disEnable"
         :class="{active: status}">
      失能模式
    </div>
  </div>
</template>

<script>
  export default {
    name: 'switch-buttons',
    data() {
      return {
        status: 0
      }
    },
    methods: {
      enable() {
        this.status = 0
      },
      disEnable() {
        this.status = 1
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.switch-wrapper
  width: 290px
  height: 70px
  border-radius: 35px
  display: flex
  padding: 5px 6px
  box-sizing: border-box
  background: #534769
  &.active
    background: #2EC759
  .button
    flex: 1
    height: 60px
    text-align: center
    line-height: 60px
    font-size: 20px
    border-radius: 35px
    color: #ffffff
    &.active
      transition: all .5s
      background: #ffffff
      box-shadow: 3px 3px 6px rgba(43, 28, 70, 0.2)
  .enable
    &.active
      color: #3FD268
  .disenable
    &.active
      color: #534769
</style>