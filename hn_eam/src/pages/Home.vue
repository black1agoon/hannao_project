<template>
  <div class="home-wrapper">
    我是主页
    <!--<keep-alive>-->
      <!--<component :is="currentComponent"></component>-->
    <!--</keep-alive>-->
  </div>
</template>

<script>
  export default {
    name: 'home',
    computed: {
    },
    data() {
      return {
        currentComponent: null
      }
    },
    methods: {
      getHomePage() { // 设置第一次进入主页显示第一个(多个dashboard的话)
      },
      getDashBoard() {
      }
    },
    mounted() {
      this.getDashBoard()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.home-wrapper
  overflow: auto
  background: #F0F2F5
</style>
