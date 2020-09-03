<template>
  <div class="wrapper">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'board'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapper
  position: relative
  width: 1920px
  height: 1080px
  font-family: 'HYWenHei'
  user-select: none
</style>